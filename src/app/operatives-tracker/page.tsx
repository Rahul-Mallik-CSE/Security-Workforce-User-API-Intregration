/** @format */

"use client";

import { useState } from "react";
import { Search, Star, Eye, MessageSquare } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, OperativeTrackerData } from "@/types/AllTypes";
import { operativesTrackerData } from "@/data/OperativesTrackerData";
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

  const filteredData = operativesTrackerData.filter(
    (guard) =>
      guard.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guard.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guard.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleRateOperative(item)}
            className="text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Rate operative"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      );
    }

    return item[columnKey as keyof OperativeTrackerData];
  };

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
      />
    </div>
  );
};

export default OperativesTrackerPage;
