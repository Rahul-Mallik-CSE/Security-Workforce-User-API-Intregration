/** @format */

"use client";

import React, { useRef, useState } from "react";
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

interface LicenseUploadStepProps {
  formData: {
    stateTerritory: string;
    licenseType: string;
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

  const states = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "South Australia",
    "Western Australia",
    "Tasmania",
    "Northern Territory",
    "Australian Capital Territory",
  ];

  const licenseTypes = [
    "Security Guard License",
    "Crowd Controller License",
    "Bodyguard License",
    "Security Consultant License",
    "Armed Guard License",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ licenseFile: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
          <Select
            value={formData.stateTerritory}
            onValueChange={(value) => updateFormData({ stateTerritory: value })}
            required
          >
            <SelectTrigger className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm">
              <SelectValue placeholder="Select your State or Territory" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          >
            <SelectTrigger className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm">
              <SelectValue placeholder="Select your company licence type" />
            </SelectTrigger>
            <SelectContent>
              {licenseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base"
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default LicenseUploadStep;
