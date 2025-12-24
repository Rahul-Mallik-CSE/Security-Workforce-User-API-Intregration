/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AmendContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId: string;
  onSubmit: (reason: string) => void;
}

const AmendContractModal: React.FC<AmendContractModalProps> = ({
  isOpen,
  onClose,
  contractId,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Please provide a reason for amending the contract");
      return;
    }
    onSubmit(reason);
    setReason("");
    onClose();
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Amend Contract
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contract ID Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Contract ID:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {contractId}
              </span>
            </div>
          </div>

          {/* Reason Textarea */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reason for Amendment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide details for why you need to amend this contract..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 characters required
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={reason.trim().length < 10}
              className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AmendContractModal;
