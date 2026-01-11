/** @format */

"use client";

import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TableColumn, PayrollData, PayrollAPIItem } from "@/types/AllTypes";
import { Search, Eye, LucideBadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPayrollsQuery } from "@/redux/freatures/payrollAPI";
import PayRollDetailsModal from "@/components/PayRollComponents/PayRollDetailsModal";
import PaidStatusChangeModal from "@/components/PayRollComponents/PaidStatusChangeModal";

const PayrollPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollData | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);

  const { data: apiData, isLoading, error } = useGetPayrollsQuery();

  const transformAPIToComponentData = (
    apiItem: PayrollAPIItem
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
    };
  };

  const payrollsData: PayrollData[] =
    apiData?.results?.pay_roles?.map(transformAPIToComponentData) || [];

  // Define table columns
  const columns: TableColumn[] = [
    { key: "jobId", label: "Job Id", width: "100px" },
    { key: "operativeName", label: "Operative Name", width: "150px" },
    { key: "duration", label: "Duration", width: "120px" },
    { key: "payRate", label: "Pay Rate", width: "100px" },
    { key: "total", label: "Total", width: "100px" },
    { key: "date", label: "Date", width: "120px" },
    { key: "status", label: "Status", width: "120px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Filter data based on search query
  const filteredData = payrollsData.filter(
    (item) =>
      item.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (item: PayrollData) => {
    setSelectedPayroll(item);
    setIsDetailsModalOpen(true);
  };

  const handleChangePaidStatus = (item: PayrollData) => {
    setSelectedPayroll(item);
    setIsPaidModalOpen(true);
  };

  // Custom cell renderer for special columns
  const renderCell = (item: PayrollData, columnKey: string) => {
    switch (columnKey) {
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
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
            >
              <LucideBadgeDollarSign className="w-4 h-4 text-gray-600" />
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

        {/* Table */}
        <CustomTable
          columns={columns}
          data={filteredData}
          itemsPerPage={10}
          renderCell={renderCell}
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
      </div>
    </div>
  );
};

export default PayrollPage;
