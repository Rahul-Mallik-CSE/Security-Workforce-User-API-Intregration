/** @format */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  MessageSquare,
  Search,
  Star,
  UserMinus,
  UserPlus,
} from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import {
  TableColumn,
  PreferredOperativeData,
  PreferredOperativeAPIItem,
} from "@/types/AllTypes";
import OperativesDetailsModal from "@/components/PreferredOperativesComponents/OperativesDetailsModal";
import { Button } from "@/components/ui/button";
import {
  useGetHiddenPreferredOperativesQuery,
  useGetPreferredOperativesQuery,
  useUpdatePreferredOperativeStatusMutation,
} from "@/redux/freatures/preferredOperativesAPI";
import { toast } from "react-toastify";

const PreferredOperativesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addSearchQuery, setAddSearchQuery] = useState("");
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [selectedHiddenOperative, setSelectedHiddenOperative] =
    useState<PreferredOperativeAPIItem | null>(null);
  const [selectedOperative, setSelectedOperative] =
    useState<PreferredOperativeAPIItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [pendingOperativeId, setPendingOperativeId] = useState<number | null>(
    null,
  );
  const addSearchRef = useRef<HTMLDivElement | null>(null);

  const {
    data: preferredApiResponse,
    isLoading: isPreferredLoading,
    error: preferredError,
    refetch: refetchPreferredOperatives,
  } = useGetPreferredOperativesQuery();

  const {
    data: hiddenApiResponse,
    isLoading: isHiddenLoading,
    refetch: refetchHiddenOperatives,
  } = useGetHiddenPreferredOperativesQuery();

  const [updatePreferredOperativeStatus] =
    useUpdatePreferredOperativeStatusMutation();

  const columns: TableColumn[] = [
    { key: "operativeId", label: "ID No.", width: "8%" },
    { key: "operativeName", label: "Operative Name", width: "15%" },
    { key: "licences", label: "Licences", width: "15%" },
    { key: "accreditations", label: "Accreditations", width: "17%" },
    { key: "rating", label: "Rating", width: "10%" },
    { key: "status", label: "Status", width: "12%" },
    { key: "action", label: "Action", width: "23%" },
  ];

  const operativesData: PreferredOperativeData[] =
    preferredApiResponse?.results?.operatives?.map((operative) => ({
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
          (l) => l.licence_type.title,
        ) || [],
      firearms:
        operative.application.candidate.accreditations.map(
          (a) => a.accreditation_type.title,
        ) || [],
      otherNotes: operative.note || "",
    })) || [];

  const hiddenOperatives = hiddenApiResponse?.results?.operatives || [];

  const filteredData = operativesData.filter(
    (operative) =>
      operative.operativeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      operative.operativeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operative.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredHiddenOperatives = useMemo(() => {
    const query = addSearchQuery.toLowerCase().trim();

    return hiddenOperatives.filter((operative) => {
      const candidate = operative.application.candidate;
      const candidateName = candidate.first_name.toLowerCase();
      const email = candidate.email.toLowerCase();
      const operativeId = String(operative.id);

      if (!query) {
        return true;
      }

      return (
        candidateName.includes(query) ||
        email.includes(query) ||
        operativeId.includes(query)
      );
    });
  }, [addSearchQuery, hiddenOperatives]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        addSearchRef.current &&
        !addSearchRef.current.contains(event.target as Node)
      ) {
        setIsAddDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleViewDetails = (operative: PreferredOperativeData) => {
    const apiItem = preferredApiResponse?.results?.operatives?.find(
      (op) => String(op.id) === operative.id,
    );

    if (apiItem) {
      setSelectedOperative(apiItem);
      setIsDetailsModalOpen(true);
    }
  };

  const handleTogglePreferredStatus = async (
    operative: PreferredOperativeAPIItem,
    status: boolean,
  ) => {
    setPendingOperativeId(operative.id);
    try {
      await updatePreferredOperativeStatus({
        id: operative.id,
        status,
      }).unwrap();
      toast.success(
        status
          ? "Operative added to preferred list successfully!"
          : "Operative removed from preferred list successfully!",
      );
      setSelectedHiddenOperative(null);
      setAddSearchQuery("");
      setIsAddDropdownOpen(false);
      await Promise.all([
        refetchPreferredOperatives(),
        refetchHiddenOperatives(),
      ]);
    } catch (error) {
      toast.error(
        status
          ? "Failed to add operative. Please try again."
          : "Failed to remove operative. Please try again.",
      );
      console.error("Preferred operative status update error:", error);
    } finally {
      setPendingOperativeId(null);
    }
  };

  const handleSelectHiddenOperative = (
    operative: PreferredOperativeAPIItem,
  ) => {
    setSelectedHiddenOperative(operative);
    setAddSearchQuery(operative.application.candidate.first_name);
    setIsAddDropdownOpen(false);
  };

  const handleAddPreferredOperative = async () => {
    if (!selectedHiddenOperative) {
      return;
    }

    await handleTogglePreferredStatus(selectedHiddenOperative, true);
  };

  const handleRemovePreferredOperative = async (
    operative: PreferredOperativeData,
  ) => {
    const apiItem = preferredApiResponse?.results?.operatives?.find(
      (op) => String(op.id) === operative.id,
    );

    if (!apiItem) {
      return;
    }

    await handleTogglePreferredStatus(apiItem, false);
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
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-medium">{item.rating}</span>
        </div>
      );
    }

    if (columnKey === "action") {
      const isRemoving = pendingOperativeId === Number(item.id);

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
            onClick={() => handleRemovePreferredOperative(item)}
            disabled={isRemoving}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-60"
            aria-label="Remove preferred operative"
          >
            <UserMinus className="w-4 h-4" />
            {isRemoving ? "Removing..." : "Remove"}
          </Button>
        </div>
      );
    }

    return item[columnKey as keyof PreferredOperativeData];
  };

  if (isPreferredLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading preferred operatives...</p>
        </div>
      </div>
    );
  }

  if (preferredError) {
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
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-semibold">
            Preferred Operatives Shortlist
          </h1>

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

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add Preferred Operative
              </h2>
              <p className="text-sm text-gray-500">
                Search the hidden operatives list, select one, then add it to
                preferred operatives.
              </p>
            </div>
          </div>

          <div ref={addSearchRef} className="relative">
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={addSearchQuery}
                  onChange={(e) => {
                    setAddSearchQuery(e.target.value);
                    setSelectedHiddenOperative(null);
                    setIsAddDropdownOpen(true);
                  }}
                  onFocus={() => setIsAddDropdownOpen(true)}
                  placeholder="Search hidden operatives"
                  className="w-full h-11 pl-9 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                {isAddDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="max-h-64 overflow-y-auto">
                      {isHiddenLoading ? (
                        <div className="p-4 text-sm text-gray-500">
                          Loading operatives...
                        </div>
                      ) : filteredHiddenOperatives.length > 0 ? (
                        filteredHiddenOperatives.map((operative) => {
                          const candidate = operative.application.candidate;
                          const isSelected =
                            selectedHiddenOperative?.id === operative.id;

                          return (
                            <button
                              key={operative.id}
                              type="button"
                              onClick={() =>
                                handleSelectHiddenOperative(operative)
                              }
                              className={`flex w-full items-start justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50 ${
                                isSelected ? "bg-blue-50" : ""
                              }`}
                            >
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {candidate.first_name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {candidate.email}
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">
                                ID: {operative.id}
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-4 text-sm text-gray-500">
                          No hidden operatives found.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleAddPreferredOperative}
                disabled={
                  !selectedHiddenOperative || pendingOperativeId !== null
                }
                className="h-11 min-w-[220px] gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UserPlus className="h-4 w-4" />
                {pendingOperativeId === selectedHiddenOperative?.id
                  ? "Adding..."
                  : "Add Preferred Operative"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />

      <OperativesDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        operative={selectedOperative}
      />
    </div>
  );
};

export default PreferredOperativesPage;
