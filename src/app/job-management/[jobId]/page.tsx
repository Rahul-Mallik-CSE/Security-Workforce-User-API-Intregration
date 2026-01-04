/** @format */

"use client";

import React, { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { useGetJobDetailsQuery } from "@/redux/freatures/jobManagementAPI";
import JobRequirementsCard from "@/components/JobManagementComponents/JobRequirementsCard";
import ApplicantsCard from "@/components/JobManagementComponents/ApplicantsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JobDetailsData, ApplicantData } from "@/types/AllTypes";

const JobDetailsPage = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const router = useRouter();
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

  // Unwrap params promise
  const { jobId } = use(params);

  // Fetch job details from API
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetJobDetailsQuery(jobId);

  // Transform API data for JobRequirementsCard
  const jobDetails: JobDetailsData | null = useMemo(() => {
    if (!apiResponse?.data) return null;

    const data = apiResponse.data;
    const status =
      data.status === "published"
        ? "In Progress"
        : data.applications?.length > 0
        ? "Tasked"
        : "Untasked";

    return {
      id: data.id.toString(),
      jobTitle: data.job_title,
      location: data.address,
      startDateTime: `${data.job_date} ${data.start_time}`,
      endDateTime: `${data.job_date} ${data.end_time}`,
      duration: `${data.job_duration} hrs`,
      licenseRequirements: data.licence_type_requirements.toString(),
      payRateType: data.pay_type,
      payAmount: `$${data.pay_rate}`,
      minimumRating: data.min_rating_requirements.toString(),
      usePreferredOperatives: data.is_preferred_guard,
      description: data.job_details,
      status: status,
    };
  }, [apiResponse]);

  // Transform API data for ApplicantsCard
  const applicants: ApplicantData[] = useMemo(() => {
    if (!apiResponse?.data?.applications) return [];

    return apiResponse.data.applications.map((app) => ({
      id: app.id.toString(),
      operativeName: app.candidate.first_name,
      jobRole: apiResponse.data.job_title, // Using job title as role
      rating: parseFloat(app.avg_rating_main) || 0,
      jobExperience: `${app.candidate.exprience_in_years} years`,
      profileImage: app.candidate.image || undefined,
      status: app.status === "selected" ? "selected" : "pending",
    }));
  }, [apiResponse]);

  const handleSelect = (id: string) => {
    setSelectedApplicants((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleViewSelected = () => {
    router.push(`/job-management/${jobId}/selected-applicants`);
  };

  const handleBack = () => {
    router.push("/job-management");
  };

  if (isLoading) {
    return (
      <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (isError || !jobDetails) {
    return (
      <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            Error loading job details. Please try again.
          </div>
        </div>
      </div>
    );
  }

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
          <JobRequirementsCard jobDetails={jobDetails} jobId={jobId} />

          {/* Right Column - Applicants View */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl text-center font-semibold text-black mb-6">
              Applicants View
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {applicants.map((applicant) => (
                <ApplicantsCard
                  key={applicant.id}
                  applicant={applicant}
                  isSelected={selectedApplicants.includes(applicant.id)}
                  onSelect={handleSelect}
                  jobId={jobId}
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
