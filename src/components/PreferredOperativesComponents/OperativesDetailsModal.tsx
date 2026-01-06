/** @format */

"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { PreferredOperativeAPIItem } from "@/types/AllTypes";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSaveOperativeNoteMutation } from "@/redux/freatures/preferredOperativesAPI";
import { toast } from "react-toastify";
import { getFullImageFullUrl } from "@/lib/utils";

interface OperativesDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operative: PreferredOperativeAPIItem | null;
}

const OperativesDetailsModal = ({
  open,
  onOpenChange,
  operative,
}: OperativesDetailsModalProps) => {
  const [note, setNote] = useState("");
  const [imageError, setImageError] = useState(false);
  const [saveNote, { isLoading: isSaving }] = useSaveOperativeNoteMutation();

  useEffect(() => {
    if (operative) {
      setNote(operative.note || "");
      setImageError(false);
    }
  }, [operative]);

  if (!operative) return null;

  const candidate = operative.application.candidate;
  const hasExistingNote = !!operative.note;
  const imageUrl = candidate.image
    ? getFullImageFullUrl(candidate.image)
    : null;

  const handleSaveNote = async () => {
    if (!note.trim()) {
      toast.error("Please enter a note before saving");
      return;
    }

    try {
      await saveNote({ id: operative.id, note: note.trim() }).unwrap();
      toast.success("Note saved successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save note. Please try again.");
      console.error("Save note error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader className="space-y-4">
          {/* Profile Image */}
          <div className="flex justify-center pt-2">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl}
                  alt={candidate.first_name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  unoptimized
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
            <div className="text-sm text-gray-600">{candidate.first_name}</div>
          </div>

          {/* State */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">State :</label>
            <div className="text-sm text-gray-600">
              {candidate.licences[0]?.state_or_territory || "N/A"}
            </div>
          </div>

          {/* Job Experience */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Job Experience :
            </label>
            <div className="text-sm text-gray-600">
              {candidate.exprience_in_years} years
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Rating :
            </label>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm text-gray-600">
                {parseFloat(operative.application.avg_rating_main).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Licence Number */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Licence Number :
            </label>
            <div className="text-sm text-gray-600">
              {candidate.licences[0]?.licence_no || "N/A"}
            </div>
          </div>

          {/* Licence Expiry Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Licence Expiry Date :
            </label>
            <div className="text-sm text-gray-600">
              {candidate.licences[0]?.expire_date || "N/A"}
            </div>
          </div>

          {/* All Licences and Accreditations */}
          <div className="py-3">
            <label className="text-sm font-semibold text-gray-900 block mb-3">
              All Licences and Accreditations
            </label>
            <div className="space-y-2">
              {candidate.licences?.map((licence, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-sm text-gray-600">
                    {licence.licence_type.title}
                  </span>
                </div>
              ))}
              {candidate.accreditations?.map((accreditation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-sm text-gray-600">
                    {accreditation.accreditation_type.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900">
                {hasExistingNote ? "Note :" : "Add Note :"}
              </label>
            </div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="write a short note"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 pb-2">
            <button
              onClick={handleSaveNote}
              className="w-full cursor-pointer bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperativesDetailsModal;
