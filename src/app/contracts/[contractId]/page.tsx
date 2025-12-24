/** @format */

"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import SignUploadModal from "@/components/ContractComponents/SignUploadModal";

const ContractDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const contractId = params.contractId as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyASignature, setPartyASignature] = useState<string>("");
  const [partyBSignature, setPartyBSignature] = useState<string>("");
  const [activeParty, setActiveParty] = useState<"A" | "B">("A");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sample data - in a real app, this would be fetched based on contractId
  const contractData = {
    employment: {
      name: "John Doe",
      dob: "Show On the Document of The Service",
      address: "123 Main Street, London",
      postcode: "SW1A 1AA",
      nationality: "United Kingdom",
      licenseExpiry: "31 Dec 2026",
      licenseNumber: "UK-123456",
      sharingCode: "ABC123XYZ",
      insuranceProvidedBy: "Security Guard 1",
      accountName: "John Doe",
      sortCode: "12-34-56",
      accountNumber: "12345678",
    },
    parties: {
      partyAName: "Security Guard 1 Ltd",
      partyASignature: "Show On the Document of The Service",
      partyADOB: "01 Jan 2010",
      partyBName: "John Doe",
      partyBDOB: "15 Mar 1990",
      partyBSignature: "Show On the Document of The Service",
    },
    engagement: {
      roleType: "Ground Controller",
      startDate: "01 Nov 2025",
      companyName: "Security Guard 1 Ltd",
      branch: "London",
      duration: "8 hours",
    },
    remuneration: {
      baseHourlyRate: "£15",
      supplementation: "10%",
      overtime: "£22",
      statutory: "£12",
    },
    acceptance: {
      partyAEmployeeName: "Michael Gray",
      partyASignDate: "12 Oct 2025, 10:25",
      partyBEmployerName: "John Doe",
      partyBSignDate: "12 Oct 2025, 10:25",
    },
  };

  const handleSignClick = (party: "A" | "B") => {
    setActiveParty(party);
    setIsModalOpen(true);
  };

  const handleSaveSignature = (signatureUrl: string) => {
    if (activeParty === "A") {
      setPartyASignature(signatureUrl);
    } else {
      setPartyBSignature(signatureUrl);
    }
  };

  const handleSubmit = () => {
    // Here you would typically make an API call to submit the contract
    setIsSubmitted(true);
  };

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
          <Button className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors">
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
              Pending
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
                      Apex Security Solutions Pty Ltd
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      ABN :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      12 345 678 910
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Company Licence No. :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      VIC-12345
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      State License Hold :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      New South Wales
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Email :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      name@gmail.com
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
                      Michael Ress
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Security Licence No. :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      GL-D-SEC-7389167
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Phone :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      +81 640 123 456
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Contact Email :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      23 Sep, 2025
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Bank Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      Trust Bank
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Account Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      23055394
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Bank State Branch (BSB) :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      082-487
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Account Number :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      98765432
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
                      Casual
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Role Type :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      Crowd Controller
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Location Address :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      85 Raw Ave, Sydney NSW 2000
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Company Name :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      Expert Group Pty Ltd
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Start Time :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      18:00
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      End Time :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      23:00
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600 w-1/2">
                      Duration (hours) :
                    </span>
                    <span className="text-base text-gray-900 w-1/2 text-right">
                      8 hours
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
                    <span className="text-xl font-semibold">Negotiate</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Supplementation (% of Hourly Rate) :
                    </span>
                    <span className="text-base text-gray-900">$225</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Gross Hourly Total (AUD) :
                    </span>
                    <span className="text-base text-gray-900">$300</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base font-semibold text-gray-600">
                      Currency :
                    </span>
                    <span className="text-base text-gray-900">AUD</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold text-gray-600">
                        Rate Amount (Negotiate)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-900">$</span>
                      <div className="flex-1 border border-gray-300 rounded px-3 py-2 text-base">
                        25
                      </div>
                    </div>
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
                      Michael Ross
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Status :
                    </span>
                    <span className="text-base text-orange-500 font-medium">
                      Pending
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Timestamp :
                    </span>
                    <span className="text-base text-gray-900">
                      14 Oct 2025, 18.03
                    </span>
                  </div>

                  {/* Signature Display and Line */}
                  <div className="mt-8 pt-4">
                    {partyASignature ? (
                      <div className="pb-2">
                        <img
                          src={partyASignature}
                          alt="Party A Signature"
                          className="max-h-20 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="pb-8"></div>
                    )}
                    <div className="border-b-2 border-gray-300"></div>
                  </div>

                  {/* Sign Button */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => handleSignClick("A")}
                      className="px-12 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium"
                    >
                      Sign
                    </Button>
                  </div>
                </div>
              </div>

              {/* Party B - Worker */}
              <div>
                <h4 className="text-lg font-bold mb-6">Party B — worker</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">Full Name :</span>
                    <span className="text-base text-gray-900 font-medium">
                      Michael Ross
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Status :
                    </span>
                    <span className="text-base text-green-600 font-medium">
                      Singed
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-base text-gray-600">
                      Signature Timestamp :
                    </span>
                    <span className="text-base text-gray-900">
                      14 Oct 2025, 18.03
                    </span>
                  </div>

                  {/* Signature Display and Line */}
                  <div className="mt-8 pt-4">
                    {partyBSignature ? (
                      <div className="pb-2">
                        <img
                          src={partyBSignature}
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

            {/* Action Buttons or Status */}
            <div className="flex justify-center gap-4 mt-12">
              {isSubmitted ? (
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-700">
                    Amend Contract status
                  </span>
                  <div className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm rounded-full font-medium">
                    Pending
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => router.back()}
                    className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="px-8 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium"
                  >
                    Submit
                  </Button>
                </>
              )}
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
