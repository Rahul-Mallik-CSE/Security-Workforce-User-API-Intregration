/** @format */

"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6 && /^[0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastFilledIndex = newOtp.findIndex((val) => !val);
    const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter complete verification code");
      return;
    }

    // Simulate OTP verification (replace with actual API call)
    // For demo: any code other than "123456" will fail
    if (otpCode !== "123456") {
      setError("Code doesn't match. Please recheck and try again.");
      return;
    }

    // Handle successful OTP verification
    console.log("Verifying OTP:", otpCode);
    setError("");
    // Navigate to reset password page
    window.location.href = "/reset-pass";
  };

  const handleResend = () => {
    // Handle resend code
    console.log("Resending code");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Enter Verification Code
          </h1>
          <p className="text-sm text-gray-600">
            We&apos;ve sent a reset link to your{" "}
            <span className="font-semibold text-gray-900">
              as.....m@gmail.com
            </span>{" "}
            email. Please check your inbox
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">
              Don&apos;t received the code?{" "}
            </span>
            <button
              type="button"
              onClick={handleResend}
              className="text-orange-500 hover:text-orange-600 font-semibold underline"
            >
              Resend
            </button>
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium text-base"
          >
            Verify
          </Button>

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-600">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
                  fill="currentColor"
                />
                <path
                  d="M8 4.5C7.65625 4.5 7.375 4.78125 7.375 5.125V8.5C7.375 8.84375 7.65625 9.125 8 9.125C8.34375 9.125 8.625 8.84375 8.625 8.5V5.125C8.625 4.78125 8.34375 4.5 8 4.5Z"
                  fill="currentColor"
                />
                <path
                  d="M8 10.25C7.65625 10.25 7.375 10.5312 7.375 10.875C7.375 11.2188 7.65625 11.5 8 11.5C8.34375 11.5 8.625 11.2188 8.625 10.875C8.625 10.5312 8.34375 10.25 8 10.25Z"
                  fill="currentColor"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
