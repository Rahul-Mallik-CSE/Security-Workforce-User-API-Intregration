/** @format */

"use client";

import React from "react";
import { Star } from "lucide-react";
import { JobDetailsData } from "@/types/AllTypes";
import { Button } from "../ui/button";

interface JobRequirementsCardProps {
  jobDetails: JobDetailsData;
}

const JobRequirementsCard = ({ jobDetails }: JobRequirementsCardProps) => {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl text-center font-semibold text-black mb-6">
          Job Requirements
        </h2>
        <div className="space-y-4">
          {/* Job Title */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Job Title :
            </span>
            <span className="text-black text-lg  text-right">
              {jobDetails.jobTitle}
            </span>
          </div>

          {/* Location */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">Location :</span>
            <span className="text-black text-lg  text-right">
              {jobDetails.location}
            </span>
          </div>

          {/* Start Date & Time */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Start Date & Time :
            </span>
            <span className="text-black text-lg text-right">
              {jobDetails.startDateTime}
            </span>
          </div>

          {/* End Date & Time */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              End Date & Time :
            </span>
            <span className="text-black text-lg text-right">
              {jobDetails.endDateTime}
            </span>
          </div>

          {/* Duration */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">Duration :</span>
            <span className="text-black text-lg  text-right">
              {jobDetails.duration}
            </span>
          </div>

          {/* License Requirements */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              License Requirements :
            </span>
            <span className="text-black text-lg  text-right">
              {jobDetails.licenseRequirements}
            </span>
          </div>

          {/* Pay Rate Type */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Pay Rate Type :
            </span>
            <span className="text-black text-lg font-semibold text-right">
              {jobDetails.payRateType}
            </span>
          </div>

          {/* Pay Amount */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Pay Amount :
            </span>
            <span className="text-black text-lg font-semibold text-right">
              {jobDetails.payAmount}
            </span>
          </div>

          {/* Minimum Rating Requirement */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Minimum Rating Requirement
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-black text-lg font-semibold">
                {jobDetails.minimumRating}
              </span>
            </div>
          </div>

          {/* Use Preferred Operatives List */}
          <div className="flex justify-between items-start">
            <span className="text-black text-lg font-semibold">
              Use Preferred Operatives List :
            </span>
            <span className="text-black text-lg font-semibold text-right">
              {jobDetails.usePreferredOperatives}
            </span>
          </div>

          {/* Description */}
          <div className="pt-2">
            <span className="text-black text-lg font-semibold block mb-2">
              Description :
            </span>
            <p className="text-black text-base leading-relaxed">
              {jobDetails.description}
            </p>
          </div>
        </div>
      </div>
      {/* Selection Complete Button */}
      <div className="pt-6 flex justify-center">
        <Button className=" py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium">
          Selection Complete
        </Button>
      </div>
    </div>
  );
};

export default JobRequirementsCard;
