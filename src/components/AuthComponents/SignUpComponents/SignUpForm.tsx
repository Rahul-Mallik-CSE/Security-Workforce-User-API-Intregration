/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useSignupMutation,
  useGoogleAuthMutation,
} from "@/redux/freatures/authAPI";
import { toast } from "react-toastify";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

// Set auth cookies directly on the client for immediate availability
const setAuthCookies = (token: string, verified: boolean) => {
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `verified=${verified}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const [googleAuth] = useGoogleAuthMutation();

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

  const handleInitialSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate password requirements
    if (!hasMinLength || !hasNumber || !hasSpecialChar) {
      toast.error("Password must meet all requirements!");
      return;
    }

    try {
      // Get referral token from URL if exists
      const urlParams = new URLSearchParams(window.location.search);
      const referralToken = urlParams.get("refer_token") || "";

      const signupData = {
        first_name: formData.companyName,
        email: formData.email,
        password: formData.password,
        user_type: "company",
      };

      const result = await signup({
        data: signupData,
        referralToken,
      }).unwrap();

      toast.success(
        result.message || "Signup successful! Please verify your email.",
      );

      // Store email for OTP verification
      sessionStorage.setItem("verification_email", formData.email);

      // Navigate to OTP verification page
      router.push("/verify-otp");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const err = error as { data?: { message?: string; email?: string[] } };
      toast.error(
        err?.data?.message ||
          err?.data?.email?.[0] ||
          "Signup failed. Please try again.",
      );
    }
  };
  const handleGoogleSignUp = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google sign up failed. No credential received.");
        return;
      }

      console.log("Sending Google credential to backend...");

      // Send the JWT id_token (credential) to the backend
      const response = await googleAuth({
        id_token: credentialResponse.credential,
        user_type: "company",
      }).unwrap();

      console.log("Google auth response:", response);

      // Check for access token (the essential field) rather than success flag
      if (response.access) {
        // Set cookies directly on client for immediate availability
        setAuthCookies(response.access, response.verified ?? true);
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem(
          "verified",
          (response.verified ?? true).toString(),
        );
        localStorage.setItem("companyName", response.company_name || "");

        console.log("Cookies and localStorage set, redirecting...");
        toast.success(response.message || "Google sign up successful!");

        // Redirect — cookie is already set synchronously
        window.location.href = "/";
      } else {
        // Backend returned response but no access token
        console.error("No access token in response:", response);
        toast.error(
          response.message ||
            response.error ||
            "Google sign up failed. No access token received.",
        );
      }
    } catch (error: unknown) {
      console.error("Google sign up error:", error);
      const err = error as {
        data?: { message?: string; error?: string };
        status?: number;
      };
      console.error("Error details:", JSON.stringify(err, null, 2));
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        "Google sign up failed. Please try again.";
      toast.error(errorMessage);
    }
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
              Terms & Conditions
            </Link>
          </label>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={!agreedToTerms || isLoading}
          className="w-full h-12 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-semibold text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
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
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignUp}
            onError={() => {
              toast.error("Google sign up failed. Please try again.");
            }}
            theme="outline"
            size="large"
            width="400"
            text="signup_with"
          />
        </div>
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
