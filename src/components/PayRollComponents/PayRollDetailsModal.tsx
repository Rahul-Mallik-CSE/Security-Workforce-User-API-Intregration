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
import { jsPDF } from "jspdf";

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
    const doc = new jsPDF();

    // Set up document styling
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Payroll Details", pageWidth / 2, yPosition, { align: "center" });

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

    // Add all payroll details
    addRow("Job ID:", payroll.jobId);
    addRow("Operative Name:", payroll.operativeName);

    if (payroll.email) {
      addRow("Email:", payroll.email);
    }

    addRow("Date:", payroll.date);

    if (payroll.startTime) {
      addRow("Start Time:", payroll.startTime);
    }

    if (payroll.endTime) {
      addRow("End Time:", payroll.endTime);
    }

    addRow("Duration:", payroll.duration);
    addRow("Pay Rate:", payroll.payRate);
    addRow("Total:", payroll.total);
    addRow("Status:", payroll.status);

    // Job Details (if exists and needs wrapping)
    if (payroll.jobDetails) {
      yPosition += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Job Details:", margin, yPosition);
      yPosition += lineHeight;
      doc.setFont("helvetica", "normal");

      const splitDetails = doc.splitTextToSize(
        payroll.jobDetails,
        pageWidth - 2 * margin
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
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Save the PDF
    doc.save(
      `Payroll_${payroll.jobId}_${payroll.operativeName.replace(
        /\s+/g,
        "_"
      )}.pdf`
    );
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
