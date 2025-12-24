/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, PenLine, Share2, Plus } from "lucide-react";
import LicenseUploadModal from "./LicenseUploadModal";

const AccountSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "Apex Security Solutions Pty Ltd",
    email: "Name@gmail.com",
    phoneNumber: "(213) 555-4927",
    stateTerritory: "Sydney",
    address: "35 Park Ave, Sydney NSW 2000",
  });

  const documents = [
    { name: "Security Operations", file: "assets.zip", expiry: "02 Sep, 2025" },
    { name: "Crowd Control", file: "assets.zip", expiry: "29 Sep, 2025" },
    { name: "Crowd Control", file: "assets.zip", expiry: "19 Sep, 2025" },
  ];

  const referralLink =
    "https://example.com/signin?refer_token=p8zVBu3Ox8Rtz2yMDa11fVVcL3kL7h5aSgRf2vEBuUq";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset formData if needed
  };

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
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-foreground text-sm">• {doc.name}</span>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    {doc.file}
                  </a>
                </div>
              </div>
              <div className="text-right">
                <span className="text-foreground text-sm">
                  Expiry Date: <span className="ml-2">{doc.expiry}</span>
                </span>
              </div>
            </div>
          ))}
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
            className="px-8 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg"
          >
            Save & Change
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
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-100 text-sm text-blue-500 px-4 py-2 rounded border border-gray-300"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-lg">
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;
