/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, PenLine, Share2, Plus } from "lucide-react";
import LicenseUploadModal from "./LicenseUploadModal";
import {
  useCompanyDetailsQuery,
  useUpdateCompanyDetailsMutation,
  useLazyGetReferralCodeQuery,
} from "@/redux/freatures/settingAPI";
import { toast } from "react-toastify";
import { getFullImageFullUrl } from "@/lib/utils";

const AccountSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    stateTerritory: "",
    address: "",
  });
  const [referralLink, setReferralLink] = useState("");

  const { data: companyData, isLoading } = useCompanyDetailsQuery();
  const [updateCompanyDetails, { isLoading: isUpdating }] =
    useUpdateCompanyDetailsMutation();
  const [getReferralCode, { isLoading: isGeneratingLink }] =
    useLazyGetReferralCodeQuery();

  useEffect(() => {
    if (companyData?.data) {
      setFormData({
        companyName: companyData.data.company_name || "",
        email: companyData.data.company.email || "",
        phoneNumber: companyData.data.phone_number || "",
        stateTerritory: companyData.data.state || "",
        address: companyData.data.address || "",
      });
    }
  }, [companyData]);

  const licenceTypeNames: { [key: number]: string } = {
    1: "Security Agent License",
    2: "Crowd Controller License",
    3: "Investigator License",
    4: "Security Officer License",
    5: "Bodyguard License",
  };

  const documents =
    companyData?.data?.company?.licences?.map((licence) => ({
      name: licenceTypeNames[licence.licence_type] || "Unknown License",
      file: licence.licence_images[0]?.file || "",
      expiry: licence.expire_date
        ? new Date(licence.expire_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      licenceNo: licence.licence_no,
    })) || [];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateCompanyDetails({
        company_name: formData.companyName,
        phone_number: formData.phoneNumber,
        address: formData.address,
        state: formData.stateTerritory,
      }).unwrap();
      toast.success("Company details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update company details. Please try again.");
      console.error("Update error:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (companyData?.data) {
      setFormData({
        companyName: companyData.data.company_name || "",
        email: companyData.data.company.email || "",
        phoneNumber: companyData.data.phone_number || "",
        stateTerritory: companyData.data.state || "",
        address: companyData.data.address || "",
      });
    }
  };

  const handleShareLink = async () => {
    try {
      const result = await getReferralCode().unwrap();
      if (result.referral_code) {
        const link = `${window.location.origin}/sign-in?refer_token=${result.referral_code}`;
        setReferralLink(link);
        navigator.clipboard.writeText(link);
        toast.success("Referral link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to generate referral link. Please try again.");
      console.error("Referral code error:", error);
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const fullUrl = getFullImageFullUrl(fileUrl);
    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="px-8 pb-16 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-16">
      {/* Form Fields */}
      <div className="space-y-6">
        {!isEditing && (
          <div className="flex items-center justify-end border-border ">
            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-900 hover:bg-blue-800 text-white gap-2 rounded-lg flex items-center -mt-20"
            >
              Edit <PenLine className="w-2 h-2" />
            </Button>
          </div>
        )}

        {/* Company Name */}
        <div className="flex items-center justify-between border-b border-border pb-2 -mt-4">
          <label className="text-foreground font-medium w-32">
            Company Name
          </label>
          <div className="flex-1 ml-8">
            {isEditing ? (
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full bg-gray-100 text-foreground px-4 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="bg-gray-100 text-foreground px-4 py-2 rounded text-sm">
                {formData.companyName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <label className="text-foreground font-medium w-32">Email</label>
          <div className="flex-1 ml-8">
            {isEditing ? (
              <input
                type="email"
                disabled
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-gray-100 text-foreground px-4 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="bg-gray-100 text-foreground px-4 py-2 rounded text-sm">
                {formData.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <label className="text-foreground font-medium w-32">
            Phone Number
          </label>
          <div className="flex-1 ml-8">
            {isEditing ? (
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full bg-gray-100 text-foreground px-4 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="bg-gray-100 text-foreground px-4 py-2 rounded text-sm">
                {formData.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {/* State/Territory */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <label className="text-foreground font-medium w-32">
            State/Territory
          </label>
          <div className="flex-1 ml-8">
            {isEditing ? (
              <input
                type="text"
                value={formData.stateTerritory}
                onChange={(e) =>
                  handleInputChange("stateTerritory", e.target.value)
                }
                className="w-full bg-gray-100 text-foreground px-4 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="bg-gray-100 text-foreground px-4 py-2 rounded text-sm">
                {formData.stateTerritory}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <label className="text-foreground font-medium w-32">Address</label>
          <div className="flex-1 ml-8">
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full bg-gray-100 text-foreground px-4 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="bg-gray-100 text-foreground px-4 py-2 rounded text-sm">
                {formData.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* All Documents Section */}
      <div className="pt-4 flex justify-between">
        <label className="text-foreground font-medium w-32">
          All Documents
        </label>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 flex-1 ml-8">
          {documents.length > 0 ? (
            documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-foreground text-sm">• {doc.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleDownload(
                          doc.file,
                          `${doc.licenceNo || "licence"}.${doc.file
                            .split(".")
                            .pop()}`
                        )
                      }
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm hover:underline">
                        {doc.licenceNo || "Download"}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-foreground text-sm">
                    Expiry Date: <span className="ml-2">{doc.expiry}</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No licences uploaded yet.</p>
          )}
          {isEditing && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setIsLicenseModalOpen(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white gap-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4" />
                Add Licences
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* License Upload Modal */}
      <LicenseUploadModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
      />

      {/* Action Buttons - Only show when editing */}
      {isEditing && (
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="px-8 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save & Change"}
          </Button>
        </div>
      )}

      {/* Referral Link Section - Only show when not editing */}
      {!isEditing && (
        <div className="pt-4 flex justify-between">
          <label className="text-foreground font-medium w-32">
            Referral Link
          </label>
          <div className="flex items-center gap-2 flex-1 ml-8">
            <input
              type="text"
              value={
                referralLink ||
                "Click 'Share Link' to generate your referral link"
              }
              readOnly
              placeholder="Click 'Share Link' to generate your referral link"
              className="flex-1 bg-gray-100 text-sm text-blue-500 px-4 py-2 rounded border border-gray-300"
            />
            <Button
              onClick={handleShareLink}
              disabled={isGeneratingLink}
              className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-lg disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              {isGeneratingLink ? "Generating..." : "Share Link"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;
