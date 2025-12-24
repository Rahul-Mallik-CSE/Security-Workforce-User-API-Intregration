/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OperativeTrackerData } from "@/types/AllTypes";

interface GuardDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guard: OperativeTrackerData | null;
}

const GuardDetailsModal = ({
  open,
  onOpenChange,
  guard,
}: GuardDetailsModalProps) => {
  if (!guard) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Guard Track Details
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Job Role */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Job Role :
            </label>
            <div className="text-sm text-gray-600">{guard.jobRole}</div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Location :
            </label>
            <div className="text-sm text-gray-600">{guard.location}</div>
          </div>

          {/* Operative Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Operative Name :
            </label>
            <div className="text-sm text-gray-600">{guard.operativeName}</div>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">Date :</label>
            <div className="text-sm text-gray-600">{guard.jobDate}</div>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Duration :
            </label>
            <div className="text-sm text-gray-600">
              {guard.duration || "N/A"}
            </div>
          </div>

          {/* Rate/hour */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Rate/hour :
            </label>
            <div className="text-sm text-gray-600">
              {guard.ratePerHour || "N/A"}
            </div>
          </div>

          {/* Check-In */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Check-In :
            </label>
            <div className="text-sm text-gray-600">
              {guard.checkIn || "N/A"}
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Check-Out :
            </label>
            <div className="text-sm text-gray-600">
              {guard.checkOut || "N/A"}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Status :
            </label>
            <div>
              <span className="inline-flex px-3 py-1 rounded text-xs font-medium bg-gray-200 text-gray-700">
                {guard.status}
              </span>
            </div>
          </div>

          {/* Approve Button */}
          <div className="pt-6">
            <button className="w-full bg-[#6b7c93] hover:bg-[#5a6a7f] text-white py-2.5 rounded-lg font-medium transition-colors">
              Approve
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuardDetailsModal;
