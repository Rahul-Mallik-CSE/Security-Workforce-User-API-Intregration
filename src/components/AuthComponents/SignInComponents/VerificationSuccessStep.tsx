/** @format */

"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface VerificationSuccessStepProps {
  onNext: () => void;
}

const VerificationSuccessStep: React.FC<VerificationSuccessStepProps> = ({
  onNext,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verification Submitted Successfully
        </h1>
        <p className="text-sm text-gray-600">
          Our team will review your documents within 24-48 hours. You&apos;ll
          get an email once approved!
        </p>
      </div>

      {/* Success Icon */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-[#0F172A] flex items-center justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2} />
        </div>
        <p className="text-sm text-gray-700 font-medium">
          Expected review time: 24-48 hours
        </p>
      </div>

      {/* Next Button */}
      {/* <Button
        onClick={onNext}
        className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base"
      >
        Next
      </Button> */}
    </div>
  );
};

export default VerificationSuccessStep;
