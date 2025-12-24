/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CreateNewJobForm from "@/components/JobManagementComponents/CreateNewJobForm";

const CreateNewJobPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-3xl font-semibold text-black">Create New Job</h1>
        </div>

        {/* Form */}
        <div className="bg-white">
          <CreateNewJobForm />
        </div>
      </div>
    </div>
  );
};

export default CreateNewJobPage;
