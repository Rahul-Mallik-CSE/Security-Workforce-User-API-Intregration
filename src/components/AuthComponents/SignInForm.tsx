/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in with:", { email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Sign in with Google");
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-base text-gray-600">
          Sign in to your Account. If you. Facilitate, in your terms
        </p>
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
              href="/forgot-password"
              className="text-base text-orange-500 hover:text-orange-600 font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base"
            required
          />
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-semibold text-base"
        >
          Sign In
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
        <Button
          type="button"
          onClick={handleGoogleSignIn}
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
          Log in with Google
        </Button>
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
