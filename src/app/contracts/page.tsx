/** @format */

"use client";

import { Search, Eye, Download } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, ContractData } from "@/types/AllTypes";
import { Button } from "@/components/ui/button";
import AmendContractModal from "@/components/ContractComponents/AmendContractModal";
import {
  useGetContractsQuery,
  useAmendContractMutation,
} from "@/redux/freatures/contractsAPI";
import { jsPDF } from "jspdf";

const ContractsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(
    null,
  );

  const { data: contractsResponse, isLoading, error } = useGetContractsQuery();
  const [amendContract, { isLoading: isAmending }] = useAmendContractMutation();

  const columns: TableColumn[] = [
    { key: "contractId", label: "Contract Id" },
    { key: "operativeName", label: "Operative Name" },
    { key: "jobRole", label: "Job Role" },
    { key: "dateCreated", label: "Date Created" },
    { key: "status", label: "Status" },
    { key: "amendRequest", label: "Amend Request" },
    { key: "action", label: "Action" },
  ];

  // Map API response to ContractData format
  const contractData = useMemo(() => {
    if (!contractsResponse?.engagements) return [];

    return contractsResponse.engagements.map((engagement) => {
      const statusMap: Record<string, ContractData["status"]> = {
        pending: "Pending",
        cancelled: "Cancelled",
        is_signed: "Signed",
        not_pay: "Not Paid",
        completed: "Complete",
      };

      const amendMap: Record<string, ContractData["amendRequest"]> = {
        not_amend: "Not Amend",
        pending: "Pending",
        accepted: "Accepted",
        rejected: "Reject",
      };

      const contract: ContractData = {
        id: engagement.id.toString(),
        contractId: engagement.id.toString(),
        operativeName: engagement.application.candidate.first_name,
        jobRole: engagement.job_details.job_title,
        dateCreated: new Date(
          engagement.job_details.created_at,
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: statusMap[engagement.contacts_trackers] || "Pending",
        amendRequest: amendMap[engagement.amend_trackers] || "Not Amend",
        originalAmendStatus: engagement.amend_trackers,
        email: engagement.application.candidate.email,
        jobDate: engagement.job_details.job_date,
        startTime: engagement.job_details.start_time,
        endTime: engagement.new_end_time || engagement.job_details.end_time,
        duration: engagement.job_details.job_duration,
        payRate: `$${engagement.job_details.pay_rate}`,
        totalAmount: `$${engagement.total_amount}`,
        jobDetails: engagement.job_details.job_details,
        address: engagement.job_details.address,
        engagementType: engagement.job_details.engagement_type,
      };

      return contract;
    });
  }, [contractsResponse]);

  const filteredData = contractData.filter(
    (contract) =>
      contract.contractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.operativeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      contract.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAmendClick = (contract: ContractData) => {
    setSelectedContract(contract);
    setIsAmendModalOpen(true);
  };

  const handleAmendSubmit = async (newEndTime: string, reason: string) => {
    if (!selectedContract) return;

    try {
      await amendContract({
        id: parseInt(selectedContract.id),
        data: {
          new_end_time: newEndTime,
          detail_amendment: reason,
        },
      }).unwrap();

      alert("Amendment request submitted successfully!");
    } catch (error) {
      console.error("Failed to submit amendment:", error);
      alert("Failed to submit amendment request. Please try again.");
    }
  };

  const handleDownloadPDF = (contract: ContractData) => {
    const doc = new jsPDF();

    // Set up document styling
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Contract Details", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 15;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Reset font for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Helper function to add a row
    const addRow = (label: string, value: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(value, margin + 60, yPosition);
      yPosition += lineHeight;
    };

    // Add all contract details
    addRow("Contract ID:", contract.contractId);
    addRow("Operative Name:", contract.operativeName);
    addRow("Job Role:", contract.jobRole);

    if (contract.email) {
      addRow("Email:", contract.email);
    }

    addRow("Date Created:", contract.dateCreated);

    if (contract.jobDate) {
      addRow("Job Date:", contract.jobDate);
    }

    if (contract.startTime) {
      addRow("Start Time:", contract.startTime);
    }

    if (contract.endTime) {
      addRow("End Time:", contract.endTime);
    }

    if (contract.duration) {
      addRow("Duration:", `${contract.duration} hours`);
    }

    if (contract.payRate) {
      addRow("Pay Rate:", contract.payRate);
    }

    if (contract.totalAmount) {
      addRow("Total Amount:", contract.totalAmount);
    }

    if (contract.engagementType) {
      addRow("Engagement Type:", contract.engagementType);
    }

    if (contract.address) {
      addRow("Location:", contract.address);
    }

    addRow("Status:", contract.status);
    addRow("Amend Request:", contract.amendRequest);

    // Job Details (if exists and needs wrapping)
    if (contract.jobDetails) {
      yPosition += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Job Details:", margin, yPosition);
      yPosition += lineHeight;
      doc.setFont("helvetica", "normal");

      const splitDetails = doc.splitTextToSize(
        contract.jobDetails,
        pageWidth - 2 * margin,
      );

      splitDetails.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    }

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        margin,
        doc.internal.pageSize.getHeight() - 10,
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin - 20,
        doc.internal.pageSize.getHeight() - 10,
      );
    }

    // Save the PDF
    doc.save(
      `Contract_${contract.contractId}_${contract.operativeName.replace(
        /\s+/g,
        "_",
      )}.pdf`,
    );
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
      } else if (item.status === "Not Paid") {
        statusColor = "bg-orange-100 text-orange-700";
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
      } else if (item.amendRequest === "Not Amend") {
        requestColor = "bg-gray-100 text-gray-700";
      }

      return (
        <div
          className={`inline-flex w-20 justify-center px-3 py-1 rounded text-xs font-medium ${requestColor}`}
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
              onClick={() => handleAmendClick(item)}
              className="px-2 py-1 bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors rounded"
            >
              (Amend)
            </Button>
          </div>
          <Button
            onClick={() => handleDownloadPDF(item)}
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

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contracts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Failed to load contracts. Please try again.
          </p>
        </div>
      </div>
    );
  }

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
        contractId={selectedContract?.contractId || ""}
        amendStatus={selectedContract?.originalAmendStatus || "not_amend"}
        onSubmit={handleAmendSubmit}
      />
    </div>
  );
};

export default ContractsPage;
