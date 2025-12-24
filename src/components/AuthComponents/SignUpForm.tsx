/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password validation checks
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign up with:", formData);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log("Sign up with Google");
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
      <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <Button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.8055 10.2292C19.8055 9.55056 19.7502 8.86718 19.6326 8.19824H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.8253C18.7174 15.8449 19.8055 13.2728 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0006C12.9517 20.0006 15.2726 19.1151 16.8294 17.5865L13.6066 15.0879C12.7096 15.6979 11.5519 16.0433 10.2044 16.0433C7.54355 16.0433 5.28765 14.2832 4.50303 11.9165H1.17236V14.4923C2.76523 17.8695 6.30955 20.0006 10.2002 20.0006Z"
              fill="#34A853"
            />
            <path
              d="M4.49891 11.9163C4.07891 10.6744 4.07891 9.33051 4.49891 8.08863V5.51279H1.17241C-0.390966 8.66852 -0.390966 12.3364 1.17241 15.4921L4.49891 11.9163Z"
              fill="#FBBC04"
            />
            <path
              d="M10.2002 3.95805C11.6247 3.936 13.0006 4.47266 14.0396 5.45722L16.8883 2.60278C15.1847 0.990558 12.9305 0.0967064 10.2002 0.122558C6.30955 0.122558 2.76523 2.25366 1.17236 5.63116L4.49886 8.20699C5.27931 5.83588 7.53938 3.95805 10.2002 3.95805Z"
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
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
