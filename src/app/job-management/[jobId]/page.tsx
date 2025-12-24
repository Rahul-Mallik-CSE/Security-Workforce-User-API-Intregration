/** @format */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { jobDetailsData, applicantsData } from "@/data/JobManagementData";
import JobRequirementsCard from "@/components/JobManagementComponents/JobRequirementsCard";
import ApplicantsCard from "@/components/JobManagementComponents/ApplicantsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JobDetailsPage = ({ params }: { params: { jobId: string } }) => {
  const router = useRouter();
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedApplicants((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleViewSelected = () => {
    router.push(`/job-management/${params.jobId}/selected-applicants`);
  };

  const handleBack = () => {
    router.push("/job-management");
  };

  return (
    <div className="max-w-[2000px] mx-auto p-6  min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            onClick={handleBack}
            className="p-2 bg-transparent hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-8 h-6 text-gray-700" />
          </Button>
          <h1 className="text-3xl font-semibold text-black">Job Details</h1>
        </div>
        <Button
          onClick={handleViewSelected}
          className="px-6 py-2 bg-[#f97316] text-white rounded-md hover:bg-[#ea580c] transition-colors"
        >
          View Selected Applicants
        </Button>
      </div>
      <div className="bg-white mx-auto p-6 rounded-xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Job Requirements */}
          <JobRequirementsCard jobDetails={jobDetailsData} />

          {/* Right Column - Applicants View */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl text-center font-semibold text-black mb-6">
              Applicants View
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicantsData.map((applicant) => (
                <ApplicantsCard
                  key={applicant.id}
                  applicant={applicant}
                  isSelected={selectedApplicants.includes(applicant.id)}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
