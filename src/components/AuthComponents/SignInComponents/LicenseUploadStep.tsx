/** @format */

"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import {
  useGetLicenseTypesQuery,
  useUploadLicenseMutation,
} from "@/redux/freatures/accountSetupAPI";
import { toast } from "react-toastify";

interface LicenseUploadStepProps {
  formData: {
    stateTerritory: string;
    licenseType: string;
    licenseNumber: string;
    licenseFile: File | null;
    licenseExpiryDate: string;
  };
  updateFormData: (data: Partial<LicenseUploadStepProps["formData"]>) => void;
  onNext: () => void;
}

const LicenseUploadStep: React.FC<LicenseUploadStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  // Fetch license types from API
  const { data: licenseTypesData, isLoading: isLoadingTypes } =
    useGetLicenseTypesQuery();
  const [uploadLicense, { isLoading: isUploading }] =
    useUploadLicenseMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ licenseFile: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("state_or_territory", formData.stateTerritory);
      formDataToSend.append("licence_type", formData.licenseType); // This is the ID
      formDataToSend.append("licence_no", formData.licenseNumber);
      formDataToSend.append("expire_date", formData.licenseExpiryDate);

      if (formData.licenseFile) {
        formDataToSend.append("licence_images", formData.licenseFile);
      }

      // Call the API
      const response = await uploadLicense(formDataToSend).unwrap();

      if (response.success) {
        toast.success(response.message || "License uploaded successfully!");
        onNext();
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to upload license. Please try again.";
      toast.error(errorMessage);
      console.error("License upload error:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Your Company Licence
        </h1>
        <p className="text-sm text-gray-600">
          Upload your Company Security Licenses and Expiry Dates for
          verification
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* State or Territory */}
        <div>
          <label
            htmlFor="stateTerritory"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            State or Territory
          </label>
          <Input
            id="stateTerritory"
            type="text"
            value={formData.stateTerritory}
            onChange={(e) => updateFormData({ stateTerritory: e.target.value })}
            placeholder="Enter state or territory"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* License Type */}
        <div>
          <label
            htmlFor="licenseType"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            License Type(s)
          </label>
          <Select
            value={formData.licenseType}
            onValueChange={(value) => updateFormData({ licenseType: value })}
            required
            disabled={isLoadingTypes}
          >
            <SelectTrigger className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm">
              <SelectValue
                placeholder={
                  isLoadingTypes
                    ? "Loading..."
                    : "Select your company licence type"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {licenseTypesData?.licence_types?.map((type: any) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* License number */}
        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            License Number
          </label>
          <Input
            id="licenseNumber"
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => updateFormData({ licenseNumber: e.target.value })}
            placeholder="Enter license number"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* License Upload */}
        <div>
          <label
            htmlFor="licenseUpload"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Licence Upload
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            required
          />
          <div className="relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className={fileName ? "text-gray-900" : "text-gray-400"}>
                {fileName ||
                  "Upload back and front images of Company Licence(s)"}
              </span>
              {!fileName && (
                <Button
                  type="button"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs px-4 py-1.5 rounded"
                >
                  Upload
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PDF, JPG, PNG
          </p>
        </div>

        {/* Licence Expiry Date */}
        <div>
          <label
            htmlFor="licenseExpiryDate"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Licence Expiry Date
          </label>
          <Input
            id="licenseExpiryDate"
            type="date"
            value={formData.licenseExpiryDate}
            onChange={(e) =>
              updateFormData({ licenseExpiryDate: e.target.value })
            }
            placeholder="Enter your licence expiry date"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={isUploading}
          className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default LicenseUploadStep;
