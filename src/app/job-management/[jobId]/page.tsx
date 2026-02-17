/** @format */

"use client";

import React, { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import {
  useGetJobDetailsQuery,
  useRemoveOperativeMutation,
} from "@/redux/freatures/jobManagementAPI";
import JobRequirementsCard from "@/components/JobManagementComponents/JobRequirementsCard";
import ApplicantsCard from "@/components/JobManagementComponents/ApplicantsCard";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  JobDetailsData,
  ApplicantData,
  JobDetailsAPIApplication,
} from "@/types/AllTypes";

const JobDetailsPage = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const router = useRouter();
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null,
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
      licenseRequirements: data.licence_type_requirements.title.toString(),
      payRateType: data.pay_type,
      payAmount: `$${data.pay_rate}`,
      minimumRating: data.min_rating_requirements.toString(),
      usePreferredOperatives: data.is_preferred_guard,
      description: data.job_details,
      status: status,
    };
  }, [apiResponse]);

  // Transform API data for ApplicantsCard (regular applications)
  const applicants: ApplicantData[] = useMemo(() => {
    if (!apiResponse?.data?.applications) return [];

    return apiResponse.data.applications.map(
      (app: JobDetailsAPIApplication) => ({
        id: app.id.toString(),
        candidateId: app.candidate.id,
        operativeName: app.candidate.first_name,
        jobRole: apiResponse.data.job_title,
        rating: parseFloat(app.avg_rating_main) || 0,
        jobExperience: `${app.candidate.exprience_in_years} years`,
        profileImage: app.candidate.image || undefined,
        status: app.status === "selected" ? "selected" : "pending",
      }),
    );
  }, [apiResponse]);

  // Transform selected_list data for ApplicantsCard
  const selectedApplicantsData: ApplicantData[] = useMemo(() => {
    if (!apiResponse?.data?.selected_list) return [];

    return apiResponse.data.selected_list.map(
      (app: JobDetailsAPIApplication) => ({
        id: app.id.toString(),
        candidateId: app.candidate.id,
        operativeName: app.candidate.first_name,
        jobRole: apiResponse.data.job_title,
        rating: parseFloat(app.avg_rating_main) || 0,
        jobExperience: `${app.candidate.exprience_in_years} years`,
        profileImage: app.candidate.image || undefined,
        status: "selected",
      }),
    );
  }, [apiResponse]);

  const handleSelect = (id: string) => {
    setSelectedApplicants((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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
            {/* Selected Applicants Section */}
            {selectedApplicantsData.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-black mb-4">
                  Selected Candidates
                </h2>
                <div className="bg-white  ">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {selectedApplicantsData.map((applicant) => (
                      <ApplicantsCard
                        key={applicant.id}
                        applicant={applicant}
                        isSelected={true}
                        onSelect={handleSelect}
                        showDelete={true}
                        onDelete={handleDeleteClick}
                        jobId={jobId}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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

export default JobDetailsPage;
