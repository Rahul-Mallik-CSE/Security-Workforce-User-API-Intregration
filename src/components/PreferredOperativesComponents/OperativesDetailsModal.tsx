/** @format */

"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { PreferredOperativeData } from "@/types/AllTypes";
import { Star } from "lucide-react";
import Image from "next/image";

interface OperativesDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operative: PreferredOperativeData | null;
}

const OperativesDetailsModal = ({
  open,
  onOpenChange,
  operative,
}: OperativesDetailsModalProps) => {
  if (!operative) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader className="space-y-4">
          {/* Profile Image */}
          <div className="flex justify-center pt-2">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {operative.profileImage ? (
                <Image
                  src={operative.profileImage}
                  alt={operative.operativeName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-0">
          {/* Operative Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Operative Name :
            </label>
            <div className="text-sm text-gray-600">
              {operative.operativeName}
            </div>
          </div>

          {/* State */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">State :</label>
            <div className="text-sm text-gray-600">{operative.state}</div>
          </div>

          {/* Job Experience */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Job Experience :
            </label>
            <div className="text-sm text-gray-600">
              {operative.jobExperience}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Rating :
            </label>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm text-gray-600">{operative.rating}</span>
            </div>
          </div>

          {/* Licence Number */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Licence Number :
            </label>
            <div className="text-sm text-gray-600">
              {operative.licenceNumber}
            </div>
          </div>

          {/* Licence Expiry Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Licence Expiry Date :
            </label>
            <div className="text-sm text-gray-600">
              {operative.licenceExpiryDate}
            </div>
          </div>

          {/* All Licences and Accreditations */}
          <div className="py-3">
            <label className="text-sm font-semibold text-gray-900 block mb-3">
              All Licences and Accreditations
            </label>
            <div className="space-y-2">
              {operative.securityOperations?.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
              {operative.firearms?.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900">
                Add Note :
              </label>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="write a sort note"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Message Button */}
          <div className="pt-4 pb-2">
            <button className="w-full cursor-pointer bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white py-2.5 rounded-lg font-medium transition-colors">
              Message
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperativesDetailsModal;
