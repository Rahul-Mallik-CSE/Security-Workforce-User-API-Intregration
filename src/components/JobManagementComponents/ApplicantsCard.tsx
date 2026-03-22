/** @format */

"use client";

import React, { useState } from "react";
import { Star, User, FileText } from "lucide-react";
import { ApplicantData } from "@/types/AllTypes";
import { Button } from "../ui/button";
import Image from "next/image";
import { getFullImageFullUrl } from "@/lib/utils";
import { useSelectOperativeMutation } from "@/redux/freatures/jobManagementAPI";
import { useCreateChatMutation } from "@/redux/freatures/chatAPI";
import { useRouter } from "next/navigation";
import LicenseImagesModal from "./LicenseImagesModal";

interface ApplicantsCardProps {
  applicant: ApplicantData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  jobId: string;
  isSelectionDisabled?: boolean;
}

const ApplicantsCard = ({
  applicant,
  isSelected,
  onSelect,
  showDelete = false,
  onDelete,
  jobId,
  isSelectionDisabled = false,
}: ApplicantsCardProps) => {
  const imageUrl = applicant.profileImage
    ? getFullImageFullUrl(applicant.profileImage)
    : "";
  const hasProfileImage = Boolean(imageUrl);
  const isExternalImage = imageUrl.startsWith("http");

  const [selectOperative, { isLoading: isSelecting }] =
    useSelectOperativeMutation();
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleChatClick = async () => {
    if (!applicant.candidateId) {
      console.error("Candidate ID is missing");
      return;
    }

    try {
      const result = await createChat({
        user_list: [applicant.candidateId],
        group_name: "Social Network",
      }).unwrap();

      // Navigate to chat page with the new chat ID
      router.push(`/chat?chatId=${result.data.id}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col overflow-hidden">
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
        {hasProfileImage ? (
          <Image
            src={imageUrl}
            alt={applicant.operativeName}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized={isExternalImage}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-500" />
          </div>
        )}
      </div>

      {/* Operative Name */}
      <div className="flex justify-between items-start mb-3 flex-wrap">
        <span className="text-sm font-semibold text-black">
          Operative Name :
        </span>
        <span className="text-sm text-gray-600 text-right">
          {applicant.operativeName}
        </span>
      </div>

      {/* Rating */}
      <div className="flex justify-between items-start mb-3 flex-wrap">
        <span className="text-sm font-semibold text-black">Rating :</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{applicant.rating}</span>
        </div>
      </div>

      {/* Job Experience */}
      <div className="flex justify-between items-start mb-3 flex-wrap">
        <span className="text-sm font-semibold text-black">
          Job Experience :
        </span>
        <span className="text-sm text-gray-600 text-right">
          {applicant.jobExperience}
        </span>
      </div>

      {/* Experience Summary */}
      <div className="flex justify-between items-start mb-6 flex-wrap">
        <span className="text-sm font-semibold text-black">
          Experience Summary :
        </span>
        <div className="text-sm text-gray-600 text-right flex-1">
          <span>
            {isExpanded
              ? applicant.experienceSummary
              : truncateText(applicant.experienceSummary, 2)}
          </span>
          {applicant.experienceSummary.split(" ").length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 ml-1 hover:underline"
            >
              {isExpanded ? "read less" : "read more"}
            </button>
          )}
        </div>
      </div>
      {/*  Licenses Buttons*/}
      <div className="w-full flex justify-between  items-center gap-2 mb-6 flex-wrap">
        <span className="text-sm font-semibold text-black ">Licenses :</span>
        <div className="text-sm text-gray-600 text-right flex-1">
          {/* View License Button */}
          <Button
            onClick={() => setIsLicenseModalOpen(true)}
            disabled={
              !applicant.licenseImages || applicant.licenseImages.length === 0
            }
            className="h-7 px-2 border bg-transparent border-gray-300 rounded-md flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-2 h-2" />
            View License
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full mt-auto flex-wrap">
        <Button
          onClick={handleChatClick}
          disabled={isCreatingChat}
          className="flex-1 px-4 py-2.5 border bg-transparent border-gray-300 rounded-md flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {isCreatingChat ? "Creating..." : "Chat"}
        </Button>

        {showDelete ? (
          <Button
            onClick={() => onDelete?.(applicant.id)}
            disabled={isSelectionDisabled}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unselect
          </Button>
        ) : (
          <Button
            onClick={async () => {
              try {
                await selectOperative({
                  jobId: jobId,
                  applicationId: applicant.id,
                }).unwrap();
                onSelect(applicant.id);
              } catch (error) {
                console.error("Failed to select operative:", error);
              }
            }}
            disabled={isSelecting || isSelectionDisabled}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isSelected
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-[#1e3a5f] text-white hover:bg-[#152a47]"
            }`}
          >
            {isSelecting ? "Selecting..." : isSelected ? "Selected" : "Select"}
          </Button>
        )}
      </div>

      {/* License Images Modal */}
      <LicenseImagesModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        licenseImages={applicant.licenseImages || []}
        operativeName={applicant.operativeName}
      />
    </div>
  );
};

export default ApplicantsCard;
