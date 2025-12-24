/** @format */

"use client";

import { Search, Eye, Download } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, ContractData } from "@/types/AllTypes";
import { contractData } from "@/data/ContractData";
import { Button } from "@/components/ui/button";
import AmendContractModal from "@/components/ContractComponents/AmendContractModal";

const ContractsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState("");

  const columns: TableColumn[] = [
    { key: "contractId", label: "Contract Id" },
    { key: "operativeName", label: "Operative Name" },
    { key: "jobRole", label: "Job Role" },
    { key: "dateCreated", label: "Date Created" },
    { key: "status", label: "Status" },
    { key: "amendRequest", label: "Amend Request" },
    { key: "action", label: "Action" },
  ];

  const filteredData = contractData.filter(
    (contract) =>
      contract.contractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.operativeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      contract.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAmendClick = (contractId: string) => {
    setSelectedContractId(contractId);
    setIsAmendModalOpen(true);
  };

  const handleAmendSubmit = (reason: string) => {
    // Here you would typically make an API call to submit the amendment request
    console.log("Amendment request for contract:", selectedContractId);
    console.log("Reason:", reason);
    // You can add notification/toast here
  };

  const renderCell = (item: ContractData, columnKey: string) => {
    if (columnKey === "status") {
      let statusColor = "";
      if (item.status === "Cancelled") {
        statusColor = "bg-red-100 text-red-700";
      } else if (item.status === "Pending") {
        statusColor = "bg-yellow-100 text-yellow-700";
      } else if (item.status === "Complete") {
        statusColor = "bg-blue-100 text-blue-700";
      } else if (item.status === "Signed") {
        statusColor = "bg-green-100 text-green-700";
      }

      return (
        <div
          className={`inline-flex w-16 justify-center px-3 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </div>
      );
    }

    if (columnKey === "amendRequest") {
      let requestColor = "";
      if (item.amendRequest === "Pending") {
        requestColor = "bg-yellow-100 text-yellow-700";
      } else if (item.amendRequest === "Accepted") {
        requestColor = "bg-blue-100 text-blue-700";
      } else if (item.amendRequest === "Reject") {
        requestColor = "bg-red-100 text-red-700";
      }

      return (
        <div
          className={`inline-flex w-16 justify-center px-3 py-1 rounded text-xs font-medium ${requestColor}`}
        >
          {item.amendRequest}
        </div>
      );
    }

    if (columnKey === "action") {
      return (
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Button
              onClick={() => router.push(`/contracts/${item.id}`)}
              className="p-1.5 bg-transparent rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="View contract"
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleAmendClick(item.contractId)}
              className="px-2 py-1 bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors rounded"
            >
              (Amend)
            </Button>
          </div>
          <Button
            onClick={() => console.log("Download contract:", item.id)}
            className="p-1.5 bg-transparent rounded-full hover:bg-gray-100 text-gray-600 hover:text-green-600 transition-colors"
            aria-label="Download contract"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      );
    }

    return item[columnKey as keyof ContractData];
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[2000px] mx-auto">
        {/* Header with Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Contracts</h1>

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
      </div>

      {/* Amend Contract Modal */}
      <AmendContractModal
        isOpen={isAmendModalOpen}
        onClose={() => setIsAmendModalOpen(false)}
        contractId={selectedContractId}
        onSubmit={handleAmendSubmit}
      />
    </div>
  );
};

export default ContractsPage;
