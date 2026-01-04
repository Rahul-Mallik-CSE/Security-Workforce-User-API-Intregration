/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RatingCategory } from "@/types/AllTypes";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { useRateOperativeMutation } from "@/redux/freatures/operativesTrackerAPI";

interface RatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operativeName: string;
  operativeId?: number;
}

const RatingModal = ({
  open,
  onOpenChange,
  operativeName,
  operativeId,
}: RatingModalProps) => {
  const [rateOperative] = useRateOperativeMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [text, setText] = useState("");

  const [ratings, setRatings] = useState<RatingCategory[]>([
    { id: "1", category: "Presentation & grooming", rating: 0 },
    { id: "2", category: "Verbal & written communication", rating: 0 },
    { id: "3", category: "Reports & administration", rating: 0 },
    { id: "4", category: "Punctuality & reliability", rating: 0 },
    { id: "5", category: "Skills & attributes", rating: 0 },
  ]);

  const handleRating = (categoryId: string, rating: number) => {
    setRatings((prev) =>
      prev.map((item) => (item.id === categoryId ? { ...item, rating } : item))
    );
  };

  const handleSubmit = async () => {
    if (!operativeId) return;

    setIsSubmitting(true);
    try {
      const ratingData = {
        presentation_grooming:
          ratings.find((r) => r.category === "Presentation & grooming")
            ?.rating || 0,
        communication:
          ratings.find((r) => r.category === "Verbal & written communication")
            ?.rating || 0,
        reports_administration:
          ratings.find((r) => r.category === "Reports & administration")
            ?.rating || 0,
        punctuality_reliability:
          ratings.find((r) => r.category === "Punctuality & reliability")
            ?.rating || 0,
        skills_attributes:
          ratings.find((r) => r.category === "Skills & attributes")?.rating ||
          0,
        text:
          text ||
          "The employee consistently demonstrates exceptional professionalism, communication skills, and reliability across all tasks.",
      };

      await rateOperative({ id: operativeId, data: ratingData }).unwrap();
      onOpenChange(false);
      // Reset form
      setRatings(ratings.map((r) => ({ ...r, rating: 0 })));
      setText("");
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLater = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Rate this Operative
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {ratings.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                <span className="text-sm text-gray-800">{item.category}</span>
              </div>
              <RadioGroup
                value={item.rating.toString()}
                onValueChange={(value) =>
                  handleRating(item.id, parseInt(value))
                }
                className="flex items-center gap-4 pl-4"
              >
                {[5, 4, 3, 2, 1].map((starValue) => (
                  <div
                    key={starValue}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <RadioGroupItem
                      value={starValue.toString()}
                      id={`${item.id}-${starValue}`}
                      className="w-4 h-4 border-orange-400 text-orange-400"
                    />
                    <label
                      htmlFor={`${item.id}-${starValue}`}
                      className="text-sm font-medium text-gray-600 cursor-pointer flex items-center gap-0.5"
                    >
                      {starValue}{" "}
                      <Star className="w-3 h-3 inline-block fill-orange-400 text-orange-400" />
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          {/* Comments Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your comments here..."
              className="w-full min-h-[80px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-6">
            <Button
              onClick={handleLater}
              className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
            >
              Later
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
