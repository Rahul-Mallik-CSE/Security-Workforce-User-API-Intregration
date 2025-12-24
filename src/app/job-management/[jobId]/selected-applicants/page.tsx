/** @format */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { selectedApplicantsData } from "@/data/JobManagementData";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import ApplicantsCard from "@/components/JobManagementComponents/ApplicantsCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SelectedApplicantsPage = ({ params }: { params: { jobId: string } }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null
  );
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>(
    selectedApplicantsData.map((app) => app.id)
  );

  const handleDeleteClick = (id: string) => {
    setSelectedApplicantId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting applicant:", selectedApplicantId);
    setShowDeleteModal(false);
    setSelectedApplicantId(null);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    // For selected applicants page, this would handle deselection
    handleDeleteClick(id);
  };

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
          {selectedApplicantsData.map((applicant) => (
            <ApplicantsCard
              key={applicant.id}
              applicant={applicant}
              isSelected={selectedApplicants.includes(applicant.id)}
              onSelect={handleSelect}
              showDelete={true}
              onDelete={handleDeleteClick}
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
