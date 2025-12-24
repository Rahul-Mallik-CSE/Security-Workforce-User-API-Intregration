/** @format */

"use client";

import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { payrollData } from "@/data/PayrollData";
import { TableColumn, PayrollData } from "@/types/AllTypes";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const PayrollPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredData = payrollData.filter(
    (item) =>
      item.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {/* <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button> */}
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof PayrollData]);
    }
  };

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
      </div>
    </div>
  );
};

export default PayrollPage;
