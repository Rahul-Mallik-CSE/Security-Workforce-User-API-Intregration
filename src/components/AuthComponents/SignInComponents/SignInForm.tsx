/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useLoginMutation,
  useGoogleAuthMutation,
} from "@/redux/freatures/authAPI";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

// Set auth cookies directly on the client for immediate availability
const setAuthCookies = (token: string, verified: boolean) => {
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `verified=${verified}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [googleAuth] = useGoogleAuthMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      if (response.success) {
        // Set cookies directly on client for immediate availability
        setAuthCookies(response.access, response.verified);
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("verified", response.verified.toString());
        localStorage.setItem("companyName", response.company_name || "");

        toast.success(response.message || "Login successful!");
        console.log("Login successful:", response);

        // Redirect — cookie is already set synchronously, no delay needed
        window.location.href = "/";
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      // Handle error response
      if (
        err?.data?.message ===
        "OTP sent to your email. Please verify before logging."
      ) {
        // Handle OTP verification required
        sessionStorage.setItem("verification_email", email);
        sessionStorage.setItem("verification_context", "login_verification");

        toast.info("OTP sent to your email. Please verify to continue.");

        // Navigate to verify OTP page
        router.push("/verify-otp");
      } else {
        const errorMessage =
          err?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    }
  };
  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google sign in failed. No credential received.");
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
        toast.success(response.message || "Google sign in successful!");

        // Redirect — cookie is already set synchronously
        window.location.href = "/";
      } else {
        // Backend returned response but no access token
        console.error("No access token in response:", response);
        toast.error(
          response.message ||
            response.error ||
            "Google sign in failed. No access token received.",
        );
      }
    } catch (error: unknown) {
      console.error("Google sign in error:", error);
      const err = error as {
        data?: { message?: string; error?: string };
        status?: number;
      };
      console.error("Error details:", JSON.stringify(err, null, 2));
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        "Google sign in failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-base text-gray-600">Sign in to your Account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Email or phone
          </label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email or phone number"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/forget-pass"
              className="text-base text-orange-500 hover:text-orange-600 font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-base">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              toast.error("Google sign in failed. Please try again.");
            }}
            theme="outline"
            size="large"
            width="400"
            text="signin_with"
          />
        </div>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-base text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-orange-500 hover:text-orange-600 font-semibold underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
