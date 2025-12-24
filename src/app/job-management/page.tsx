/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Trash2 } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, JobManagementData } from "@/types/AllTypes";
import { jobManagementData } from "@/data/JobManagementData";
import { Button } from "@/components/ui/button";

const JobManagementPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredData = jobManagementData.filter(
    (job) =>
      job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewJob = (job: JobManagementData) => {
    router.push(`/job-management/${job.id}`);
  };

  const handleDeleteJob = (job: JobManagementData) => {
    console.log("Delete job:", job.id);
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
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="View job"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteJob(item)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Delete job"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      );
    }

    return item[columnKey as keyof JobManagementData];
  };

  return (
    <div className="max-w-[2000px] mx-auto p-6">
      {/* Header with Title, Search and Create Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
      />
    </div>
  );
};

export default JobManagementPage;
