/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayrollData } from "@/types/AllTypes";
import { Download } from "lucide-react";

interface PayRollDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payroll: PayrollData | null;
}

const PayRollDetailsModal = ({
  open,
  onOpenChange,
  payroll,
}: PayRollDetailsModalProps) => {
  if (!payroll) return null;

  const handleDownloadPDF = () => {
    // PDF download functionality will be implemented by frontend
    console.log("Downloading PDF for payroll ID:", payroll.id);
    // You can implement PDF generation here using libraries like jsPDF or html2pdf
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Payroll Details
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Job ID */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Job ID :
            </label>
            <div className="text-sm text-gray-600">{payroll.jobId}</div>
          </div>

          {/* Operative Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Operative Name :
            </label>
            <div className="text-sm text-gray-600">{payroll.operativeName}</div>
          </div>

          {/* Email */}
          {payroll.email && (
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700">
                Email :
              </label>
              <div className="text-sm text-gray-600">{payroll.email}</div>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">Date :</label>
            <div className="text-sm text-gray-600">{payroll.date}</div>
          </div>

          {/* Start Time */}
          {payroll.startTime && (
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700">
                Start Time :
              </label>
              <div className="text-sm text-gray-600">{payroll.startTime}</div>
            </div>
          )}

          {/* End Time */}
          {payroll.endTime && (
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700">
                End Time :
              </label>
              <div className="text-sm text-gray-600">{payroll.endTime}</div>
            </div>
          )}

          {/* Duration */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Duration :
            </label>
            <div className="text-sm text-gray-600">{payroll.duration}</div>
          </div>

          {/* Pay Rate */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Pay Rate :
            </label>
            <div className="text-sm text-gray-600">{payroll.payRate}</div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">Total :</label>
            <div className="text-sm font-semibold text-gray-900">
              {payroll.total}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Status :
            </label>
            <div>
              <span
                className={`inline-flex px-3 py-1 rounded text-xs font-medium ${
                  payroll.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {payroll.status}
              </span>
            </div>
          </div>

          {/* Job Details */}
          {payroll.jobDetails && (
            <div className="py-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Job Details :
              </label>
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                {payroll.jobDetails}
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="pt-6">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-2.5 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayRollDetailsModal;
