/** @format */

"use client";

import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, PayrollData, PayrollAPIItem } from "@/types/AllTypes";
import { Search, Eye, Download, CheckSquare2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPayrollsQuery } from "@/redux/freatures/payrollAPI";
import PayRollDetailsModal from "@/components/PayRollComponents/PayRollDetailsModal";
import PaidStatusChangeModal from "@/components/PayRollComponents/PaidStatusChangeModal";
import BulkMarkAsPaidModal from "@/components/PayRollComponents/BulkMarkAsPaidModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PayrollPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollData | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: apiData, isLoading, error, refetch } = useGetPayrollsQuery();

  const transformAPIToComponentData = (
    apiItem: PayrollAPIItem,
  ): PayrollData => {
    const isPaid = apiItem.contacts_trackers === "not_pay";

    return {
      id: apiItem.id.toString(),
      jobId: apiItem.job_details.id.toString(),
      operativeName: apiItem.application.candidate.first_name,
      duration: apiItem.job_details.job_duration + " hrs",
      payRate: "$" + apiItem.job_details.pay_rate,
      total: "$" + apiItem.total_amount,
      date: new Date(apiItem.job_details.job_date).toLocaleDateString(),
      status: !isPaid ? "Paid" : "Unpaid",
      isPaid: !isPaid,
      email: apiItem.application.candidate.email,
      startTime: apiItem.job_details.start_time,
      endTime: apiItem.new_end_time || apiItem.job_details.end_time,
      jobDetails: apiItem.job_details.job_details,
      bankName: apiItem.application.candidate.bank_name,
      accountHolderName: apiItem.application.candidate.account_holder_name,
      bankBranch: apiItem.application.candidate.bank_branch,
      accountNumber: apiItem.application.candidate.account_no,
    };
  };

  const payrollsData: PayrollData[] =
    apiData?.results?.pay_roles?.map(transformAPIToComponentData) || [];

  // Filter data based on tab
  let filteredByTab = payrollsData;
  if (activeTab === "paid") {
    filteredByTab = payrollsData.filter((item) => item.isPaid);
  } else if (activeTab === "unpaid") {
    filteredByTab = payrollsData.filter((item) => !item.isPaid);
  }

  // Filter data based on search query
  const filteredData = filteredByTab.filter(
    (item) =>
      item.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Define table columns
  const columns: TableColumn[] = [
    { key: "checkbox", label: "", width: "50px" },
    { key: "jobId", label: "Job Id", width: "100px" },
    { key: "operativeName", label: "Operative Name", width: "150px" },
    { key: "duration", label: "Duration", width: "120px" },
    { key: "payRate", label: "Pay Rate", width: "100px" },
    { key: "total", label: "Total", width: "100px" },
    { key: "date", label: "Date", width: "120px" },
    { key: "status", label: "Status", width: "120px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Checkbox handlers
  const handleCheckboxChange = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(filteredData.map((item) => item.id));
      setSelectedIds(allIds);
    }
  };

  const selectedPayrolls = filteredData.filter((item) =>
    selectedIds.has(item.id),
  );

  const handleViewDetails = (item: PayrollData) => {
    setSelectedPayroll(item);
    setIsDetailsModalOpen(true);
  };

  const handleChangePaidStatus = (item: PayrollData) => {
    setSelectedPayroll(item);
    setIsPaidModalOpen(true);
  };

  const handleBulkMarkAsPaid = () => {
    if (selectedPayrolls.length > 0) {
      setIsBulkModalOpen(true);
    }
  };

  const handleDownloadPDF = () => {
    if (selectedPayrolls.length === 0) {
      alert("Please select at least one payroll record to download");
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const totalAmount = selectedPayrolls.reduce((sum, p) => {
      const amount = parseFloat(p.total.replace("$", ""));
      return sum + amount;
    }, 0);

    // Create HTML content
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payroll Report</title>
        <style>
          @page { size: A4; margin: 20mm; }
          @media print {
            body { margin: 0; padding: 0; }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 11px; line-height: 1.6; color: #333; padding: 20px; }
          .container { max-width: 900px; margin: 0 auto; }
          .header { margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
          .date { font-size: 12px; color: #666; margin-top: 5px; }
          .summary { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
          .summary-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .summary-label { font-weight: bold; }
          .record { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; page-break-inside: avoid; }
          .record-title { font-size: 12px; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
          .record-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
          .record-label { font-weight: bold; width: 50%; }
          .record-value { width: 50%; word-break: break-word; }
          .banking-header { font-weight: bold; font-size: 11px; margin-top: 8px; margin-bottom: 4px; }
          .total-section { margin-top: 30px; padding-top: 20px; border-top: 2px solid #333; }
          .total-row { display: flex; justify-content: space-between; margin-top: 10px; }
          .total-amount { font-weight: bold; font-size: 14px; }
          .no-print { display: none; }
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">Payroll Report</div>
            <div class="date">Generated on: ${currentDate}</div>
          </div>

          <div class="summary">
            <div class="summary-item">
              <span class="summary-label">Total Records:</span>
              <span>${selectedPayrolls.length}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Report Date:</span>
              <span>${currentDate}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Total Amount:</span>
              <span style="font-weight: bold; color: #0066cc;">$${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div class="records">
    `;

    // Add records
    selectedPayrolls.forEach((payroll, index) => {
      htmlContent += `
        <div class="record">
          <div class="record-title">Record ${index + 1} - ${payroll.operativeName}</div>
          <div class="record-row">
            <span class="record-label">Job ID:</span>
            <span class="record-value">${payroll.jobId}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Operative Name:</span>
            <span class="record-value">${payroll.operativeName}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Email:</span>
            <span class="record-value">${payroll.email || "N/A"}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Date:</span>
            <span class="record-value">${payroll.date}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Duration:</span>
            <span class="record-value">${payroll.duration}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Pay Rate:</span>
            <span class="record-value">${payroll.payRate}</span>
          </div>
          <div class="record-row">
            <span class="record-label">Total Amount:</span>
            <span class="record-value" style="font-weight: bold;">${payroll.total}</span>
          </div>
      `;

      // Add banking information if available
      if (
        payroll.bankName ||
        payroll.accountHolderName ||
        payroll.bankBranch ||
        payroll.accountNumber
      ) {
        htmlContent += `<div class="banking-header">Banking Information:</div>`;
        if (payroll.bankName) {
          htmlContent += `
            <div class="record-row">
              <span class="record-label">Bank Name:</span>
              <span class="record-value">${payroll.bankName}</span>
            </div>
          `;
        }
        if (payroll.accountHolderName) {
          htmlContent += `
            <div class="record-row">
              <span class="record-label">Account Holder:</span>
              <span class="record-value">${payroll.accountHolderName}</span>
            </div>
          `;
        }
        if (payroll.bankBranch) {
          htmlContent += `
            <div class="record-row">
              <span class="record-label">Bank Branch:</span>
              <span class="record-value">${payroll.bankBranch}</span>
            </div>
          `;
        }
        if (payroll.accountNumber) {
          htmlContent += `
            <div class="record-row">
              <span class="record-label">Account Number:</span>
              <span class="record-value">${payroll.accountNumber}</span>
            </div>
          `;
        }
      }

      htmlContent += `</div>`;
    });

    // Close records and add total
    htmlContent += `
          </div>

          <div class="total-section">
            <div class="total-row">
              <span class="total-amount">Grand Total:</span>
              <span class="total-amount">$${totalAmount.toFixed(2)}</span>
            </div>
            <div class="total-row" style="margin-top: 10px;">
              <span>Records: ${selectedPayrolls.length}</span>
              <span>Generated: ${currentDate}</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payroll-report-${currentDate}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Custom cell renderer for special columns
  const renderCell = (item: PayrollData, columnKey: string) => {
    switch (columnKey) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedIds.has(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
            className="w-4 h-4 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        );
      case "status":
        return (
          <div
            className={`px-2 py-1 w-16 flex justify-center rounded-lg text-xs font-medium ${
              item.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {item.status}
          </div>
        );
      case "action":
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleViewDetails(item)}
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              onClick={() => handleChangePaidStatus(item)}
              className="px-2 h-7  text-black bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Mark as Paid
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof PayrollData]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading payroll data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading payroll data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-[2000px] mx-auto">
        {/* Header with Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Payroll</h1>

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

        {/* Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-xs grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900">
              {selectedIds.size} payroll{selectedIds.size !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button
                onClick={handleBulkMarkAsPaid}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <CheckSquare2 className="w-4 h-4" />
                Mark as Paid
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <CustomTable
          columns={columns}
          data={filteredData}
          itemsPerPage={10}
          renderCell={renderCell}
          renderHeaderCell={(columnKey) => {
            if (columnKey === "checkbox") {
              const isIndeterminate =
                selectedIds.size > 0 && selectedIds.size < filteredData.length;
              return (
                <input
                  type="checkbox"
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = isIndeterminate;
                    }
                  }}
                  checked={
                    isIndeterminate || selectedIds.size === filteredData.length
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              );
            }
            return null;
          }}
        />

        {/* Payroll Details Modal */}
        <PayRollDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          payroll={selectedPayroll}
        />

        {/* Paid Status Change Modal */}
        <PaidStatusChangeModal
          open={isPaidModalOpen}
          onOpenChange={setIsPaidModalOpen}
          payroll={selectedPayroll}
        />

        {/* Bulk Mark as Paid Modal */}
        <BulkMarkAsPaidModal
          open={isBulkModalOpen}
          onOpenChange={setIsBulkModalOpen}
          selectedPayrolls={selectedPayrolls}
          onSuccess={() => {
            setSelectedIds(new Set());
            refetch();
          }}
        />
      </div>
    </div>
  );
};

export default PayrollPage;
