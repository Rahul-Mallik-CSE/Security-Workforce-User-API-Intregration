/** @format */

"use client";

import { useState, useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import {
  TableColumn,
  ReferralUserData,
  ReferralUserAPIResponse,
} from "@/types/AllTypes";
import { Eye, Search } from "lucide-react";
import UserDetailsModal from "@/components/MyReferralComponents/UserDetailsModal";
import { Button } from "@/components/ui/button";
import { useGetReferralUsersQuery } from "@/redux/freatures/myReferralUserAPI";

const MyReferralUserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<ReferralUserData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch referral users from API
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetReferralUsersQuery({});

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!apiResponse?.users) return [];

    return apiResponse.users.map(
      (user: ReferralUserAPIResponse): ReferralUserData => ({
        id: user.id.toString(),
        userName: user.first_name,
        email: user.email,
        joinDate: new Date(user.create_at).toLocaleDateString(),
        subscribed: user.is_subscribe ? "Yes" : "No",
        status: user.is_earned ? "Earned" : "Pending",
        address: user.address || undefined,
        purchaseDate: user.is_subscribe
          ? new Date(user.create_at).toLocaleDateString()
          : undefined,
      }),
    );
  }, [apiResponse]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return transformedData;

    const query = searchQuery.toLowerCase();
    return transformedData.filter(
      (user: ReferralUserData) =>
        user.userName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query),
    );
  }, [transformedData, searchQuery]);

  const columns: TableColumn[] = [
    { key: "userName", label: "User Name", width: "20%" },
    { key: "email", label: "Email Address", width: "25%" },
    { key: "joinDate", label: "Join Date", width: "15%" },
    { key: "subscribed", label: "Subscribed", width: "12%" },
    { key: "status", label: "Status", width: "15%" },
    { key: "action", label: "Action", width: "13%" },
  ];

  const handleViewUser = (user: ReferralUserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading referral users...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">
              Error loading referral users. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderCell = (item: ReferralUserData, columnKey: string) => {
    if (columnKey === "status") {
      return (
        <span
          className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium ${
            item.status === "Earned"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>
      );
    }

    if (columnKey === "action") {
      return (
        <div className="flex items-center ">
          <Button
            onClick={() => handleViewUser(item)}
            className="text-gray-600 bg-transparent hover:bg-gray-50 hover:text-blue-600 transition-colors"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
      );
    }

    return item[columnKey as keyof ReferralUserData];
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-[2000px] mx-auto">
        {/* Header with Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">My Referrals user</h1>

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

        {/* User Details Modal */}
        <UserDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default MyReferralUserPage;
