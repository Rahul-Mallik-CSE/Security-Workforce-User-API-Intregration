/** @format */

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Trash2 } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import {
  TableColumn,
  JobManagementData,
  JobPostAPIResponse,
} from "@/types/AllTypes";
import { Button } from "@/components/ui/button";
import {
  useGetJobPostsQuery,
  useDeleteJobPostMutation,
} from "@/redux/freatures/jobManagementAPI";

const JobManagementPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Fetch job posts from API
  const { data: apiResponse, isLoading, isError } = useGetJobPostsQuery({});

  const [deleteJobPost, { isLoading: isDeleting }] = useDeleteJobPostMutation();

  const columns: TableColumn[] = [
    { key: "jobId", label: "Job ID" },
    { key: "role", label: "Role" },
    { key: "location", label: "Location" },
    { key: "date", label: "Date" },
    { key: "duration", label: "Duration" },
    { key: "startTime", label: "Start Time" },
    { key: "payRate", label: "Pay Rate" },
    { key: "required", label: "Required" },
    { key: "selected", label: "Selected" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  // Transform API data to table format
  const transformedData = useMemo(() => {
    if (!apiResponse?.jobs_posts) return [];

    return apiResponse.jobs_posts.map(
      (job: JobPostAPIResponse): JobManagementData => ({
        id: job.id.toString(),
        jobId: `JOB-${job.id.toString().padStart(4, "0")}`,
        role: job.job_title,
        location: job.address,
        date: job.job_date,
        duration: `${job.job_duration} hrs`,
        startTime: job.start_time,
        payRate: `$${job.pay_rate}/hr`,
        required: job.operative_required,
        selected: job.selected_list?.length || 0,
        status:
          job.status === "published"
            ? "In Progress"
            : job.applications?.length > 0
            ? "Tasked"
            : "Untasked",
      })
    );
  }, [apiResponse]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return transformedData;

    const query = searchQuery.toLowerCase();
    return transformedData.filter(
      (job) =>
        job.jobId.toLowerCase().includes(query) ||
        job.role.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query)
    );
  }, [transformedData, searchQuery]);

  const handleViewJob = (job: JobManagementData) => {
    router.push(`/job-management/${job.id}`);
  };

  const handleDeleteJob = (job: JobManagementData) => {
    setSelectedJobId(job.id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedJobId) return;

    try {
      await deleteJobPost(selectedJobId).unwrap();
      setShowDeleteModal(false);
      setSelectedJobId(null);
    } catch (error) {
      console.error("Failed to delete job post:", error);
    }
  };

  const handleCreateNewJob = () => {
    router.push("/job-management/create-new-job");
  };

  const renderCell = (item: JobManagementData, columnKey: string) => {
    if (columnKey === "status") {
      let statusColor = "";
      if (item.status === "Tasked") {
        statusColor = "bg-red-100 text-red-700";
      } else if (item.status === "In Progress") {
        statusColor = "bg-green-100 text-green-700";
      } else if (item.status === "Untasked") {
        statusColor = "bg-gray-100 text-gray-700";
      }

      return (
        <div
          className={`inline-flex w-20 justify-center px-3 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </div>
      );
    }

    if (columnKey === "action") {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewJob(item)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="View job"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteJob(item)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Delete job"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      );
    }

    return item[columnKey as keyof JobManagementData];
  };

  if (isLoading) {
    return (
      <div className="max-w-[2000px] mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading job posts...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[2000px] mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">
            Error loading job posts. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] mx-auto p-6">
      {/* Header with Title, Search and Create Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
        <h1 className="text-3xl font-semibold">Job Management</h1>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for..."
              className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Create New Job Button */}
          <Button
            onClick={handleCreateNewJob}
            className="flex items-center gap-2 px-4 py-1 bg-orange-500 text-white rounded-lg  hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            <span className="text-lg">+</span>
            <span className="text-sm font-medium">Create New Job</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
        itemsPerPage={20}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Job Post"
        description="Are you sure you want to delete this job post? This action cannot be undone."
        itemName="This job post"
      />
    </div>
  );
};

export default JobManagementPage;
