/** @format */

"use client";

import { useState } from "react";
import { Search, Star, Eye, MessageSquare } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import {
  TableColumn,
  OperativeTrackerData,
  OperativeTrackerAPIItem,
} from "@/types/AllTypes";
import { useGetOperativeTrackersQuery } from "@/redux/freatures/operativesTrackerAPI";
import GuardDetailsModal from "@/components/OperativesTrackerComponents/GaurdDetailsModal";
import RatingModal from "@/components/OperativesTrackerComponents/RatingModal";

const OperativesTrackerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuard, setSelectedGuard] =
    useState<OperativeTrackerData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [guardToRate, setGuardToRate] = useState<OperativeTrackerData | null>(
    null
  );

  const { data: apiData, isLoading, error } = useGetOperativeTrackersQuery();

  const transformAPIToComponentData = (
    apiItem: OperativeTrackerAPIItem
  ): OperativeTrackerData => {
    const statusMap: {
      [key: string]: "Shift Complete" | "On-Duty" | "Not Started";
    } = {
      shift_completed: "Shift Complete",
      on_duty: "On-Duty",
      notstartyet: "Not Started",
    };

    return {
      id: apiItem.id.toString(),
      jobId: apiItem.job_details.id.toString(),
      operativeName: apiItem.application.candidate.first_name,
      jobRole: apiItem.job_details.job_title,
      jobDate: new Date(apiItem.job_details.job_date).toLocaleDateString(),
      location: apiItem.job_details.address,
      status: statusMap[apiItem.operative_trackers] || "Not Started",
      rating: parseFloat(apiItem.application.avg_rating_main) || null,
      duration: apiItem.job_details.job_duration,
      ratePerHour: apiItem.job_details.pay_rate,
      checkIn: apiItem.job_details.start_time,
      checkOut: apiItem.new_end_time || apiItem.job_details.end_time,
      is_shift_end: apiItem.is_shift_end,
    };
  };

  const operativesData: OperativeTrackerData[] =
    apiData?.results?.operatives?.map(transformAPIToComponentData) || [];

  const filteredData = operativesData.filter(
    (guard) =>
      guard.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guard.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guard.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: TableColumn[] = [
    { key: "jobId", label: "Job Id", width: "10%" },
    { key: "operativeName", label: "Operative Name", width: "13%" },
    { key: "jobRole", label: "Job Role", width: "13%" },
    { key: "jobDate", label: "Job Date", width: "12%" },
    { key: "location", label: "Location", width: "13%" },
    { key: "status", label: "Status", width: "13%" },
    { key: "rating", label: "Rating", width: "11%" },
    { key: "action", label: "Action", width: "15%" },
  ];

  const handleViewDetails = (guard: OperativeTrackerData) => {
    setSelectedGuard(guard);
    setIsDetailsModalOpen(true);
  };

  const handleRateOperative = (guard: OperativeTrackerData) => {
    setGuardToRate(guard);
    setIsRatingModalOpen(true);
  };

  const renderCell = (item: OperativeTrackerData, columnKey: string) => {
    if (columnKey === "status") {
      let statusColor = "";
      if (item.status === "Shift Complete") {
        statusColor = "bg-blue-100 text-blue-700";
      } else if (item.status === "On-Duty") {
        statusColor = "bg-green-100 text-green-700";
      } else if (item.status === "Not Started") {
        statusColor = "bg-gray-100 text-gray-700";
      }

      return (
        <span
          className={`inline-flex px-3 py-1 rounded-lg w-24  justify-center text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </span>
      );
    }

    if (columnKey === "rating") {
      if (item.rating === null) {
        return <span className="text-gray-400">---</span>;
      }
      return (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-medium">{item.rating}</span>
        </div>
      );
    }

    if (columnKey === "action") {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleViewDetails(item)}
            className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleRateOperative(item)}
            className="cursor-pointer text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Rate operative"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      );
    }

    return item[columnKey as keyof OperativeTrackerData];
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading operatives data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading operatives data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Title and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Guards Track</h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Table */}
      <CustomTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />

      {/* Guard Details Modal */}
      <GuardDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        guard={selectedGuard}
      />

      {/* Rating Modal */}
      <RatingModal
        open={isRatingModalOpen}
        onOpenChange={setIsRatingModalOpen}
        operativeName={guardToRate?.operativeName || ""}
        operativeId={guardToRate?.id ? parseInt(guardToRate.id) : undefined}
      />
    </div>
  );
};

export default OperativesTrackerPage;
