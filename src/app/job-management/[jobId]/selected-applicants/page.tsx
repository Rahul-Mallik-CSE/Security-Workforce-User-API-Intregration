/** @format */

"use client";

import React, { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import {
  useGetJobDetailsQuery,
  useRemoveOperativeMutation,
} from "@/redux/freatures/jobManagementAPI";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import ApplicantsCard from "@/components/JobManagementComponents/ApplicantsCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicantData, JobDetailsAPIApplication } from "@/types/AllTypes";

const SelectedApplicantsPage = ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null
  );

  // Unwrap params promise
  const { jobId } = use(params);

  // Fetch job details from API
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetJobDetailsQuery(jobId);

  const [removeOperative, { isLoading: isRemoving }] =
    useRemoveOperativeMutation();

  // Transform selected_list data for ApplicantsCard
  const selectedApplicants: ApplicantData[] = useMemo(() => {
    if (!apiResponse?.data?.selected_list) return [];

    return apiResponse.data.selected_list.map(
      (app: JobDetailsAPIApplication) => ({
        id: app.id.toString(),
        candidateId: app.candidate.id,
        operativeName: app.candidate.first_name,
        jobRole: apiResponse.data.job_title, // Using job title as role
        rating: parseFloat(app.avg_rating_main) || 0,
        jobExperience: `${app.candidate.exprience_in_years} years`,
        profileImage: app.candidate.image || undefined,
        status: "selected",
      })
    );
  }, [apiResponse]);

  const handleDeleteClick = (id: string) => {
    setSelectedApplicantId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedApplicantId) return;

    try {
      await removeOperative({
        jobId: jobId,
        applicationId: selectedApplicantId,
      }).unwrap();

      setShowDeleteModal(false);
      setSelectedApplicantId(null);
    } catch (error) {
      console.error("Failed to remove operative:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    // For selected applicants page, this would handle deselection
    handleDeleteClick(id);
  };

  if (isLoading) {
    return (
      <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading selected applicants...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            Error loading selected applicants. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center ">
          <Button
            onClick={handleBack}
            className="p-2 bg-transparent hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-8 h-6 text-gray-700" />
          </Button>
          <h1 className="text-3xl font-semibold text-[#1e293b]">
            Selected Applicants
          </h1>
        </div>

        {/* Applicants Grid */}
        <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 rounded-2xl">
          {selectedApplicants.map((applicant) => (
            <ApplicantsCard
              key={applicant.id}
              applicant={applicant}
              isSelected={true} // All applicants in this page are selected
              onSelect={handleSelect}
              showDelete={true}
              onDelete={handleDeleteClick}
              jobId={jobId}
            />
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Remove Applicant"
        description="Are you sure you want to remove this applicant from the selected list?"
        itemName="This applicant"
      />
    </div>
  );
};

export default SelectedApplicantsPage;
