/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import CompanyInfoStep from "../SignInComponents/CompanyInfoStep";
import LicenseUploadStep from "../SignInComponents/LicenseUploadStep";
import VerificationSuccessStep from "../SignInComponents/VerificationSuccessStep";
import JoinNowModal from "../SignInComponents/JoinNowModal";
import ReferralModal from "../SignInComponents/ReferralModal";

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = initial signup, 1-3 = stepper steps
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    // Initial Signup
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 1: Company Info
    phoneNumber: "",
    abnAcnNumber: "",
    profileImage: null as File | null,
    // Step 2: License Upload
    stateTerritory: "",
    licenseType: "",
    licenseFile: null as File | null,
    licenseExpiryDate: "",
  });

  // Password validation checks
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleInitialSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Move to stepper flow
    setCurrentStep(1);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log("Sign up with Google");
    // After Google signup, move to stepper
    setCurrentStep(1);
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600">
          Create an Account to take control of your business, on your terms
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleInitialSignUp} className="space-y-5">
        {/* Company Name Field */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Company Name
          </label>
          <Input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Enter your company name"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* Email Address Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email address"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="•••••••••"
              className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Confirm Password
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
        <div className="space-y-1 text-xs">
          <p
            className={`${
              hasMinLength ? "text-green-600" : "text-gray-600"
            } font-medium`}
          >
            At least 8 characters
          </p>
          <p
            className={`${
              hasNumber ? "text-green-600" : "text-gray-600"
            } font-medium`}
          >
            Contains a number
          </p>
          <p
            className={`${
              hasSpecialChar ? "text-green-600" : "text-gray-600"
            } font-medium`}
          >
            Contains a special character
          </p>
        </div>

        {/* Terms & Privacy Checkbox */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-blue-900 hover:underline font-medium"
            >
              Terms & Privacy
            </Link>
          </label>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={!agreedToTerms}
          className="w-full h-12 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-semibold text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Sign Up
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <Button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm flex items-center justify-center gap-3"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign Up with Google
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-900 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
