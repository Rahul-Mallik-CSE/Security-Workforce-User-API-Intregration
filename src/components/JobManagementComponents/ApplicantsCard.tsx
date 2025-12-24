/** @format */

"use client";

import React from "react";
import { Star } from "lucide-react";
import { ApplicantData } from "@/types/AllTypes";
import { Button } from "../ui/button";
import Image from "next/image";

interface ApplicantsCardProps {
  applicant: ApplicantData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

const ApplicantsCard = ({
  applicant,
  isSelected,
  onSelect,
  showDelete = false,
  onDelete,
}: ApplicantsCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
        <Image
          src="/profile-img.png"
          alt={applicant.operativeName}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Operative Name */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-semibold text-black">
          Operative Name :
        </span>
        <span className="text-sm text-gray-600 text-right">
          {applicant.operativeName}
        </span>
      </div>

      {/* Rating */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-semibold text-black">Rating :</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{applicant.rating}</span>
        </div>
      </div>

      {/* Job Experience */}
      <div className="flex justify-between items-start mb-6">
        <span className="text-sm font-semibold text-black">
          Job Experience :
        </span>
        <span className="text-sm text-gray-600 text-right">
          {applicant.jobExperience}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full mt-auto">
        <Button className="flex-1 px-4 py-2.5 border bg-transparent border-gray-300 rounded-md flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Chat
        </Button>
        {showDelete ? (
          <Button
            onClick={() => onDelete?.(applicant.id)}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </Button>
        ) : (
          <Button
            onClick={() => onSelect(applicant.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isSelected
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-[#1e3a5f] text-white hover:bg-[#152a47]"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicantsCard;
