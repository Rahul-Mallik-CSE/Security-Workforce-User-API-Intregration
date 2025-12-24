/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReferralUserData } from "@/types/AllTypes";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ReferralUserData | null;
}

const UserDetailsModal = ({
  open,
  onOpenChange,
  user,
}: UserDetailsModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold">
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-2">
          {/* User Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              User Name :
            </label>
            <div className="text-sm text-gray-600">{user.userName}</div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">Email :</label>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>

          {/* Address */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Address :
            </label>
            <div className="text-sm text-gray-600">{user.address || "N/A"}</div>
          </div>

          {/* Join Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Join Date :
            </label>
            <div className="text-sm text-gray-600">{user.joinDate}</div>
          </div>

          {/* Subscription */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Subscription :
            </label>
            <div className="text-sm text-gray-600">{user.subscribed}</div>
          </div>

          {/* Purchase Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Purchase Date :
            </label>
            <div className="text-sm text-gray-600">
              {user.purchaseDate || "N/A"}
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
                  user.status === "Earned"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Message Button */}
          <div className="pt-6">
            <button className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white py-2.5 rounded-lg font-medium transition-colors">
              Message
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
