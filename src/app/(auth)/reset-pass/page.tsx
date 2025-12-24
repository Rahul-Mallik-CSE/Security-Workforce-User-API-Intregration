/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetPassPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Password validation checks
  const hasMinLength = formData.newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasNumber = /\d/.test(formData.newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password requirements
    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      setError(
        "Password must meet all requirements: 8 characters, 1 uppercase, 1 number, and 1 special character"
      );
      return;
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Confirm Password must be the same as New Password");
      return;
    }

    // Handle password reset
    console.log("Password reset successful");
    // Navigate to sign-in page or show success message
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Icon and Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-gray-700" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600">
            Reset your account password and access your personal account again
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="•••••••••"
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="•••••••••"
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-gray-600">
            <p>
              At least 8 characters with 1 uppercase, 1 number, and 1 special
              character.
            </p>
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium text-base"
          >
            Next
          </Button>

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-600">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8 13C5.24 13 3 10.76 3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13Z"
                  fill="currentColor"
                />
                <path
                  d="M7.25 5.5C7.25 5.08579 7.58579 4.75 8 4.75C8.41421 4.75 8.75 5.08579 8.75 5.5V8.5C8.75 8.91421 8.41421 9.25 8 9.25C7.58579 9.25 7.25 8.91421 7.25 8.5V5.5Z"
                  fill="currentColor"
                />
                <circle cx="8" cy="11" r="0.75" fill="currentColor" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassPage;
