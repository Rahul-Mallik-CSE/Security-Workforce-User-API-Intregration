/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayrollData } from "@/types/AllTypes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useBulkMarkAsPaidMutation } from "@/redux/freatures/payrollAPI";

interface BulkMarkAsPaidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPayrolls: PayrollData[];
  onSuccess: () => void;
}

const BulkMarkAsPaidModal = ({
  open,
  onOpenChange,
  selectedPayrolls,
  onSuccess,
}: BulkMarkAsPaidModalProps) => {
  const [bulkMarkAsPaid, { isLoading: isSubmitting }] =
    useBulkMarkAsPaidMutation();

  if (!selectedPayrolls.length) return null;

  const handleMarkAsPaid = async () => {
    try {
      const invoiceIds = selectedPayrolls.map((p) => parseInt(p.id));

      await bulkMarkAsPaid(invoiceIds).unwrap();

      onOpenChange(false);
      onSuccess();
      toast.success("Marked as paid successfully");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to mark as paid",
      );
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const totalAmount = selectedPayrolls.reduce((sum, p) => {
    const amount = parseFloat(p.total.replace("$", ""));
    return sum + amount;
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Mark Selected Payrolls as Paid
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to mark {selectedPayrolls.length} payroll
            {selectedPayrolls.length > 1 ? "s" : ""} as paid?
          </p>

          {/* Selected Payrolls Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto space-y-3">
            {selectedPayrolls.map((payroll, index) => (
              <div
                key={payroll.id}
                className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {payroll.operativeName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Job ID: {payroll.jobId}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {payroll.total}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">
                Total Amount:
              </span>
              <span className="text-lg font-semibold text-blue-600">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMarkAsPaid}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Processing..." : "Mark as Paid"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkMarkAsPaidModal;
