/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/redux/freatures/authAPI";
import { toast } from "react-toastify";

const ForgetPassPage = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrPhone)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await forgetPassword({
        email: emailOrPhone,
      }).unwrap();

      toast.success(result.message || "Verification code sent to your email!");

      // Store email and set context for forget password flow
      sessionStorage.setItem("verification_email", emailOrPhone);
      sessionStorage.setItem("verification_context", "forget_password");

      // Navigate to OTP verification page
      router.push("/verify-otp");
    } catch (error: any) {
      console.error("Forget password error:", error);
      toast.error(
        error?.data?.message ||
          error?.data?.email?.[0] ||
          "Failed to send verification code. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Find Your Account
          </h1>
          <p className="text-sm text-gray-600">
            Please enter your email address or mobile number to search for your
            account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-6">
          {/* Email/Phone Input */}
          <div>
            <Input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your email or phone number"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
              required
            />
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium text-base disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Next"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassPage;
