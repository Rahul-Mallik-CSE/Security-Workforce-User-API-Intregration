/** @format */

"use client";

import { useState } from "react";
import { Search, MessageSquare, Trash2, Star } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import {
  TableColumn,
  PreferredOperativeData,
  PreferredOperativeAPIItem,
} from "@/types/AllTypes";
import OperativesDetailsModal from "@/components/PreferredOperativesComponents/OperativesDetailsModal";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  useGetPreferredOperativesQuery,
  useDeletePreferredOperativeMutation,
} from "@/redux/freatures/preferredOperativesAPI";
import { toast } from "react-toastify";

const PreferredOperativesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOperative, setSelectedOperative] =
    useState<PreferredOperativeAPIItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [operativeToDelete, setOperativeToDelete] =
    useState<PreferredOperativeAPIItem | null>(null);

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetPreferredOperativesQuery();
  const [deleteOperative, { isLoading: isDeleting }] =
    useDeletePreferredOperativeMutation();

  const columns: TableColumn[] = [
    { key: "operativeId", label: "ID No.", width: "8%" },
    { key: "operativeName", label: "Operative Name", width: "15%" },
    { key: "licences", label: "Licences", width: "15%" },
    { key: "accreditations", label: "Accreditations", width: "17%" },
    { key: "rating", label: "Rating", width: "10%" },
    { key: "status", label: "Status", width: "12%" },
    { key: "action", label: "Action", width: "23%" },
  ];

  // Transform API data to match table structure
  const operativesData: PreferredOperativeData[] =
    apiResponse?.results?.operatives?.map((operative) => ({
      id: String(operative.id),
      operativeId: `OP-${operative.application.candidate.id}`,
      operativeName: operative.application.candidate.first_name,
      licences:
        operative.application.candidate.licences
          .map((l) => l.licence_type.title)
          .join(", ") || "N/A",
      accreditations:
        operative.application.candidate.accreditations
          .map((a) => a.accreditation_type.title)
          .join(", ") || "N/A",
      rating: parseFloat(operative.application.avg_rating_main),
      status: operative.application.is_admin_aproved ? "Hired" : "Interested",
      profileImage: operative.application.candidate.image || undefined,
      state:
        operative.application.candidate.licences[0]?.state_or_territory ||
        "N/A",
      jobExperience: `${operative.application.candidate.exprience_in_years} years`,
      licenceNumber:
        operative.application.candidate.licences[0]?.licence_no || "N/A",
      licenceExpiryDate:
        operative.application.candidate.licences[0]?.expire_date || "N/A",
      securityOperations:
        operative.application.candidate.licences.map(
          (l) => l.licence_type.title
        ) || [],
      firearms:
        operative.application.candidate.accreditations.map(
          (a) => a.accreditation_type.title
        ) || [],
      otherNotes: operative.note || "",
    })) || [];

  const filteredData = operativesData.filter(
    (operative) =>
      operative.operativeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      operative.operativeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operative.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (operative: PreferredOperativeData) => {
    // Find the corresponding API item
    const apiItem = apiResponse?.results?.operatives?.find(
      (op) => String(op.id) === operative.id
    );
    if (apiItem) {
      setSelectedOperative(apiItem);
      setIsDetailsModalOpen(true);
    }
  };

  const handleDelete = (operative: PreferredOperativeData) => {
    const apiItem = apiResponse?.results?.operatives?.find(
      (op) => String(op.id) === operative.id
    );
    if (apiItem) {
      setOperativeToDelete(apiItem);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (operativeToDelete) {
      try {
        await deleteOperative(operativeToDelete.id).unwrap();
        toast.success("Operative deleted successfully!");
        setOperativeToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        toast.error("Failed to delete operative. Please try again.");
        console.error("Delete error:", error);
      }
    }
  };

  const renderCell = (item: PreferredOperativeData, columnKey: string) => {
    if (columnKey === "status") {
      const statusColor =
        item.status === "Hired"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

      return (
        <div
          className={`inline-flex w-20 justify-center px-3 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </div>
      );
    }

    if (columnKey === "rating") {
      return (
        <div className="flex  items-center gap-1">
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-medium">{item.rating}</span>
        </div>
      );
    }

    if (columnKey === "action") {
      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleViewDetails(item)}
            className="p-1.5 rounded-full bg-transparent hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="View details"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => handleDelete(item)}
            className="p-1.5 rounded-full bg-transparent hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      );
    }

    return item[columnKey as keyof PreferredOperativeData];
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preferred operatives...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">Failed to load preferred operatives</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Title and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">
          Preferred Operatives Shortlist
        </h1>

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

      {/* Operatives Details Modal */}
      <OperativesDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        operative={selectedOperative}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={confirmDelete}
        title="Delete Operative"
        itemName={operativeToDelete?.application?.candidate?.first_name}
      />
    </div>
  );
};

export default PreferredOperativesPage;
