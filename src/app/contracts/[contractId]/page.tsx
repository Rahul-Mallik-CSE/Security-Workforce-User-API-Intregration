/** @format */

"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import SignUploadModal from "@/components/ContractComponents/SignUploadModal";
import {
  useGetContractDetailsQuery,
  useUpdatePayRateMutation,
  useUploadSignatureMutation,
} from "@/redux/freatures/contractsAPI";
import { getFullImageFullUrl } from "@/lib/utils";

const ContractDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const contractId = parseInt(params.contractId as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedSignature, setUploadedSignature] = useState<string>("");
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [newPayRate, setNewPayRate] = useState<string>("");

  // API hooks
  const {
    data: contractResponse,
    isLoading,
    error,
    refetch,
  } = useGetContractDetailsQuery(contractId);
  const [updatePayRate] = useUpdatePayRateMutation();
  const [uploadSignature] = useUploadSignatureMutation();

  // Extract data from response
  const engagement = contractResponse?.engagements;
  const jobDetails = engagement?.job_details;
  const application = engagement?.application;
  const candidate = application?.candidate;
  const jobProvider = jobDetails?.job_provider;
  const company = jobProvider?.company;
  const firstLicence =
    candidate?.licences && candidate.licences.length > 0
      ? candidate.licences[0]
      : null;

  const handleSignClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveSignature = (signatureUrl: string) => {
    setUploadedSignature(signatureUrl);
  };

  const handleSubmit = async () => {
    if (!uploadedSignature) {
      alert("Please upload a signature first");
      return;
    }

    try {
      // Convert base64 to blob
      const blob = await fetch(uploadedSignature).then((res) => res.blob());
      const formData = new FormData();
      formData.append("signature_party_a", blob, "signature.png");

      await uploadSignature({ id: contractId, signature: formData }).unwrap();
      alert("Signature uploaded successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to upload signature:", error);
      alert("Failed to upload signature. Please try again.");
    }
  };

  const handleUpdatePayRate = async () => {
    if (!newPayRate || isNaN(parseFloat(newPayRate))) {
      toast.error("Please enter a valid pay rate");
      return;
    }

    try {
      const response: any = await updatePayRate({
        id: contractId,
        data: { pay_rate: parseFloat(newPayRate) },
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Pay rate updated successfully!");
        setIsEditingRate(false);
        refetch();
      } else {
        toast.error(response.message || "Failed to update pay rate");
        if (response.errors) {
          toast.error(response.errors);
        }
      }
    } catch (error: any) {
      console.error("Failed to update pay rate:", error);
      const errorMessage =
        error?.data?.message ||
        error?.data?.errors ||
        "Failed to update pay rate. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleDownloadPDF = () => {
    if (!engagement || !jobDetails || !candidate || !company) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let yPosition = 20;

    // Helper function
    const addRow = (label: string, value: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, yPosition);
      doc.setFont("helvetica", "normal");
      const splitValue = doc.splitTextToSize(value, pageWidth - margin - 70);
      doc.text(splitValue, margin + 60, yPosition);
      yPosition += lineHeight * splitValue.length;
    };

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Employment Contract Details", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Contract Information
    addRow("Contract ID:", `CN-${engagement.id.toString().padStart(3, "0")}`);
    addRow("Status:", jobDetails.status);
    yPosition += 5;

    // Party A - Employer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Party A - Employer", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Company Name:", company.first_name);
    addRow("Email:", company.email);
    if (company.phone) addRow("Phone:", company.phone);
    yPosition += 5;

    // Party B - Employee
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Party B - Employee", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Full Name:", candidate.first_name);
    addRow("Email:", candidate.email);
    if (candidate.phone) addRow("Phone:", candidate.phone);
    if (firstLicence?.licence_no)
      addRow("Licence Number:", firstLicence.licence_no);
    if (firstLicence?.expire_date)
      addRow("Licence Expiry:", firstLicence.expire_date);
    if (candidate.bank_name) addRow("Bank Name:", candidate.bank_name);
    if (candidate.account_holder_name)
      addRow("Account Holder:", candidate.account_holder_name);
    if (candidate.account_no) addRow("Account Number:", candidate.account_no);
    yPosition += 5;

    // Engagement Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Engagement Details", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Role Type:", jobDetails.job_title);
    addRow("Engagement Type:", jobDetails.engagement_type);
    addRow("Company Name:", company.first_name);
    addRow("Start Time:", jobDetails.start_time);
    addRow("End Time:", engagement.new_end_time || jobDetails.end_time);
    addRow("Duration:", `${jobDetails.job_duration} hours`);
    addRow("Location:", jobDetails.address);
    yPosition += 5;

    // Remuneration
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Remuneration", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Base Hourly Rate:", `$${jobDetails.pay_rate}`);
    addRow("Gross Total (AUD):", `$${engagement.total_amount}`);
    yPosition += 5;

    // Job Details
    if (jobDetails.job_details) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Job Details", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      const splitDetails = doc.splitTextToSize(
        jobDetails.job_details,
        pageWidth - 2 * margin
      );
      splitDetails.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        margin,
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save(
      `Contract_CN-${engagement.id}_${candidate.first_name.replace(
        /\s+/g,
        "_"
      )}.pdf`
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contract details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !engagement || !jobDetails || !candidate || !company) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Failed to load contract details. Please try again.
          </p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Map status based on ENGAGEMENT_STATUS
  const statusMap: Record<string, string> = {
    pending: "Processing",
    cancelled: "Cancelled",
    is_signed: "Signed",
    not_pay: "Not Pay",
    completed: "Completed Everything",
  };
  const displayStatus =
    statusMap[engagement.contacts_trackers] || engagement.contacts_trackers;

  // Signature status
  const partyASignatureStatus = engagement.signature_party_a
    ? "Signed"
    : "Pending";
  const partyBSignatureStatus = engagement.signature_party_b
    ? "Signed"
    : "Pending";

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[2000px] mx-auto">
        {/* Back Button and Title */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Employment Contract Details
            </h1>
          </div>
          <Button
            onClick={handleDownloadPDF}
            className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
          >
            Download
          </Button>
        </div>

        {/* Contract Sections */}
        <div className="space-y-6 bg-white rounded-2xl p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between pb-2 ">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Employment / Engagement Contract
              </h2>
              <p className="text-base text-gray-600">
                Auto-generated via the Securiverse Platform
              </p>
            </div>
            <div className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm rounded-full font-medium">
              {displayStatus}
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">Disclaimer</h3>
            <p className="text-base text-gray-700 leading-relaxed">
              Securiverse is a technology platform. It is not the employer of or
              agent of or act on behalf of the employer or any other party; it
              does not direct work and is not a party to this contract.
              Securiverse does not advertise or provide security services and
              does not employ security officers, crowd controllers,
              investigators, consultants, installers or any other parties within
              this agreement.
            </p>
          </div>

          {/* Parties and Engagement Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Parties Section */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-6">Parties</h3>

              {/* Party A - Employer */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">
                  Party A — Employer
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Legal Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {company.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      ABN :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobProvider.abn_number || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Company Licence No. :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {firstLicence?.licence_no || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      State License Hold :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {firstLicence?.state_or_territory || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Email :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {company.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Party B - Employee */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-4">
                  Party B — Employee
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Full Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Security Licence No. :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {firstLicence?.licence_no || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Phone :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Email :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Bank Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.bank_name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Account Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.account_holder_name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Bank State Branch (BSB) :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.bank_branch || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Account Number :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {candidate.account_no || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Details Section */}
            <div>
              <div className="border border-gray-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-6">Engagement Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Engagement Type :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobDetails.engagement_type}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Role Type :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobDetails.job_title}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Location Address :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobDetails.address}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Company Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {company.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Start Time :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobDetails.start_time}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      End Time :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {engagement.new_end_time || jobDetails.end_time}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Duration (hours) :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      {jobDetails.job_duration} hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Remuneration Section */}
              <div className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Remuneration</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Base Hourly Rate (AUD) :
                    </span>
                    <span className="text-xl font-semibold">
                      ${jobDetails.pay_rate}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Gross Hourly Total (AUD) :
                    </span>
                    <span className="text-base text-gray-900">
                      ${engagement.total_amount}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Currency :
                    </span>
                    <span className="text-base text-gray-900">
                      {application.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold text-gray-600">
                        Rate Amount (Negotiate)
                      </span>
                    </div>
                    {isEditingRate ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-900">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={newPayRate}
                            onChange={(e) => setNewPayRate(e.target.value)}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-base"
                            placeholder={jobDetails.pay_rate}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleUpdatePayRate}
                            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditingRate(false);
                              setNewPayRate("");
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900">$</span>
                        <div className="flex-1 border border-gray-300 rounded px-3 py-2 text-base">
                          {jobDetails.pay_rate}
                        </div>
                        <Button
                          onClick={() => {
                            setIsEditingRate(true);
                            setNewPayRate(jobDetails.pay_rate);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Confirmation Section */}
          <div className=" rounded-2xl p-4">
            <h3 className="text-2xl font-bold mb-4">Compliance Confirmation</h3>
            <p className="text-base text-gray-700 leading-relaxed">
              If disputes arise, they extend no further than the parties
              mentioned within this Agreement & should be addressed as such.
              Securiverse retains the right to support discussions with
              disputing parties and the right to disengage at any point. Parties
              may seek advice and engage, private, State and/or Federal bodies
              to support resolution.
            </p>
          </div>

          {/* Privacy & Data Section */}
          <div className=" rounded-2xl p-4">
            <h3 className="text-2xl font-bold mb-6">Privacy & Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Consents */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Consents</h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  Each party consents to the information contained within this
                  Agreement being shared with the other party and stored by
                  Securiverse.
                </p>
              </div>

              {/* Data Use */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Data Use</h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  Data collected includes party details, timestamps, and
                  metadata such as location data stored by Securiverse.
                </p>
              </div>
            </div>
          </div>

          {/* Acceptance & Signatures Section */}
          <div className="rounded-2xl p-4">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Acceptance & Signatures
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Party A - Employer */}
              <div>
                <h4 className="text-lg font-bold mb-6">Party A — Employer</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">Full Name :</span>
                    <span className="text-base text-gray-900 font-medium">
                      {company.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Status :
                    </span>
                    <span
                      className={`text-base font-medium ${
                        partyASignatureStatus === "Signed"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {partyASignatureStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Timestamp :
                    </span>
                    <span className="text-base text-gray-900">
                      {new Date(jobDetails.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>

                  {/* Signature Display and Line */}
                  <div className="mt-8 pt-4">
                    {engagement.signature_party_a ? (
                      <div className="pb-2">
                        <img
                          src={getFullImageFullUrl(
                            engagement.signature_party_a
                          )}
                          alt="Party A Signature"
                          className="max-h-20 object-contain"
                        />
                      </div>
                    ) : uploadedSignature ? (
                      <div className="pb-2">
                        <img
                          src={uploadedSignature}
                          alt="Party A Signature Preview"
                          className="max-h-20 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="pb-8"></div>
                    )}
                    <div className="border-b-2 border-gray-300"></div>
                  </div>

                  {/* Sign Button */}
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleSignClick}
                      disabled={!!engagement.signature_party_a}
                      className="px-8 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Sign
                    </Button>
                  </div>
                </div>
              </div>

              {/* Party B - Worker */}
              <div>
                <h4 className="text-lg font-bold mb-6">Party B — Worker</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">Full Name :</span>
                    <span className="text-base text-gray-900 font-medium">
                      {candidate.first_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Status :
                    </span>
                    <span
                      className={`text-base font-medium ${
                        partyBSignatureStatus === "Signed"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {partyBSignatureStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Timestamp :
                    </span>
                    <span className="text-base text-gray-900">
                      {new Date(candidate.create_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>

                  {/* Signature Display and Line */}
                  <div className="mt-8 pt-4">
                    {engagement.signature_party_b ? (
                      <div className="pb-2">
                        <img
                          src={getFullImageFullUrl(
                            engagement.signature_party_b
                          )}
                          alt="Party B Signature"
                          className="max-h-20 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="pb-8"></div>
                    )}
                    <div className="border-b-2 border-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-12">
              <Button
                onClick={handleSubmit}
                disabled={!!engagement.signature_party_a}
                className="px-8 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
              </Button>
              <Button
                onClick={() => router.back()}
                className="px-8 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Upload Modal */}
      <SignUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSignature}
      />
    </div>
  );
};

export default ContractDetailsPage;
