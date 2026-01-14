/** @format */

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { useUpdateUserProfileMutation } from "@/redux/freatures/accountSetupAPI";
import { toast } from "react-toastify";

interface CompanyInfoStepProps {
  formData: {
    companyName: string;
    phoneNumber: string;

    profileImage: File | null;
  };
  updateFormData: (data: Partial<CompanyInfoStepProps["formData"]>) => void;
  onNext: () => void;
}

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ profileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.companyName);
      formDataToSend.append("phone", formData.phoneNumber);

      if (formData.profileImage) {
        formDataToSend.append("image", formData.profileImage);
      }

      // Call the API
      const response = await updateUserProfile(formDataToSend).unwrap();

      if (response.success) {
        toast.success(response.message || "Profile updated successfully!");
        onNext();
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      const errorMessage =
        err?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
      console.error("Profile update error:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Let&apos;s Get to Know You
        </h1>
        <p className="text-sm text-gray-600">
          Add Company details to complete your Securiverse profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">Upload Profile Image</p>
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Company Name
          </label>
          <Input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            placeholder="Enter your company name"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            placeholder="Enter your phone number"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default CompanyInfoStep;
