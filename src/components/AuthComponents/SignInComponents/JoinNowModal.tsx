/** @format */

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

interface JoinNowModalProps {
  onSubscribe: () => void;
  onDoLater: () => void;
}

const JoinNowModal: React.FC<JoinNowModalProps> = ({
  onSubscribe,
  onDoLater,
}) => {
  const benefits = [
    "Access to thousands of available guards. Recruit at instant, not months",
    "Search and select by performance rating",
    "Locate or deploy guards by location with GPS mapping",
    "Onboard and offboard with in-app Smart Contract",
    "Fill your entire roster with one Job post",
    "Upskills work instructions with In-app chat",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onDoLater}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Now!</h2>
          <p className="text-sm text-gray-600 mb-1">
            To post jobs and access our database, you'll need to
          </p>
          <p className="text-sm text-gray-600 mb-4">subscribe</p>
          <div className="text-4xl font-bold text-orange-500">
            $48<span className="text-lg text-gray-600">/per month</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Benefits:
          </h3>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Button */}
        <Button
          onClick={onSubscribe}
          className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base mb-3"
        >
          Subscribe Now
        </Button>

        {/* Do it Later Button */}
        <Button
          onClick={onDoLater}
          variant="outline"
          className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold text-base"
        >
          Do it Later
        </Button>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          You can subscribe now or{" "}
          <span className="font-semibold">Stay Free</span> until you want — but
          you&apos;ll need an active subscription before you can access a free
          trial.
        </p>
      </div>
    </div>
  );
};

export default JoinNowModal;
