/** @format */

"use client";

import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, ReferralUserData } from "@/types/AllTypes";
import { myReferralData } from "@/data/MyReferralData";
import { Eye, Search, Trash2 } from "lucide-react";
import UserDetailsModal from "@/components/MyReferralComponents/UserDetailsModal";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import { Button } from "@/components/ui/button";

const MyReferralUserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<ReferralUserData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ReferralUserData | null>(
    null
  );

  const columns: TableColumn[] = [
    { key: "userName", label: "User Name", width: "20%" },
    { key: "email", label: "Email Address", width: "25%" },
    { key: "joinDate", label: "Join Date", width: "15%" },
    { key: "subscribed", label: "Subscribed", width: "12%" },
    { key: "status", label: "Status", width: "15%" },
    { key: "action", label: "Action", width: "13%" },
  ];

  const filteredData = myReferralData.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUser = (user: ReferralUserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: ReferralUserData) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete.id);
      // Add actual delete logic here (e.g., API call, state update)
      setUserToDelete(null);
    }
  };

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
          <Button
            onClick={() => handleDeleteUser(item)}
            className="text-gray-600 bg-transparent hover:bg-gray-50 hover:text-red-600 transition-colors"
            aria-label="Delete user"
          >
            <Trash2 className="w-5 h-5" />
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
          <h1 className="text-2xl md:text-3xl font-semibold">
            My Referral User
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

        {/* User Details Modal */}
        <UserDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          user={selectedUser}
        />

        {/* Delete Confirmation Modal */}
        <DeleteModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={confirmDelete}
          title="Delete User"
          itemName={userToDelete?.userName}
        />
      </div>
    </div>
  );
};

export default MyReferralUserPage;
