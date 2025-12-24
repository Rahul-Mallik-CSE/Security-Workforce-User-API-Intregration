/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

const VerifyMethodPage = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"email" | "phone" | "">(
    ""
  );

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert("Please select a verification method");
      return;
    }
    // Handle verification method selection
    console.log("Selected method:", selectedMethod);
    // Navigate to OTP verification page
    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Verification Method
          </h1>
          <p className="text-sm text-gray-600">
            We found your account. Choose how you&apos;d like to receive your
            reset code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-4">
          {/* Email Option */}
          <div
            onClick={() => setSelectedMethod("email")}
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMethod === "email"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedMethod === "email" ? "bg-white" : "bg-gray-50"
              }`}
            >
              <Mail
                className={`w-6 h-6 ${
                  selectedMethod === "email"
                    ? "text-orange-500"
                    : "text-gray-600"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Send Code to Email
              </p>
              <p className="text-xs text-gray-500">sm.....m@gmail.com</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "email"
                  ? "border-orange-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "email" && (
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              )}
            </div>
          </div>

          {/* Phone Option */}
          <div
            onClick={() => setSelectedMethod("phone")}
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMethod === "phone"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedMethod === "phone" ? "bg-white" : "bg-gray-50"
              }`}
            >
              <Smartphone
                className={`w-6 h-6 ${
                  selectedMethod === "phone"
                    ? "text-orange-500"
                    : "text-gray-600"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Send Code to Phone
              </p>
              <p className="text-xs text-gray-500">+880 16******56</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "phone"
                  ? "border-orange-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "phone" && (
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={!selectedMethod}
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyMethodPage;
