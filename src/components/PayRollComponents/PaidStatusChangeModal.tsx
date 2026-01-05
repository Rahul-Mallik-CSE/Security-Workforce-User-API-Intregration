/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayrollData } from "@/types/AllTypes";
import { useMarkAsPaidMutation } from "@/redux/freatures/payrollAPI";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface PaidStatusChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payroll: PayrollData | null;
}

const PaidStatusChangeModal = ({
  open,
  onOpenChange,
  payroll,
}: PaidStatusChangeModalProps) => {
  const [markAsPaid] = useMarkAsPaidMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!payroll) return null;

  const handleMarkAsPaid = async () => {
    if (payroll.isPaid) return;

    setIsSubmitting(true);
    try {
      await markAsPaid(parseInt(payroll.id)).unwrap();
      onOpenChange(false);
      toast.success("Marked as paid successfully");
    } catch (error) {
      toast.error("Failed to mark as paid");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Change the Paid Status
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to mark this payroll as paid?
          </p>

          {/* Payroll Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Job ID:</span>
              <span className="text-sm font-medium text-gray-900">
                {payroll.jobId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operative:</span>
              <span className="text-sm font-medium text-gray-900">
                {payroll.operativeName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Amount:</span>
              <span className="text-sm font-semibold text-gray-900">
                {payroll.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Status:</span>
              <span
                className={`text-sm font-medium ${
                  payroll.isPaid ? "text-green-600" : "text-gray-600"
                }`}
              >
                {payroll.status}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMarkAsPaid}
              disabled={payroll.isPaid || isSubmitting}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                payroll.isPaid || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : payroll.isPaid
                ? "Already Paid"
                : "Mark as Paid"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaidStatusChangeModal;
