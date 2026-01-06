/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useProfileDetailsQuery } from "@/redux/freatures/settingAPI";
import { useSendSupportMessageMutation } from "@/redux/freatures/supportAPI";
import { toast } from "react-toastify";

export default function SupportForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user profile data
  const { data: profileData, isLoading: profileLoading } =
    useProfileDetailsQuery();
  const [sendSupportMessage, { isLoading: submitting }] =
    useSendSupportMessageMutation();

  // Pre-fill name and email from user profile
  useEffect(() => {
    if (profileData?.data) {
      const firstName = profileData.data.first_name || "";
      const lastName = profileData.data.last_name || "";
      const fullNameFromProfile = `${firstName} ${lastName}`.trim();

      setFullName(fullNameFromProfile);
      setEmail(profileData.data.email || "");
    }
  }, [profileData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    try {
      const result = await sendSupportMessage({
        full_name: fullName,
        email: email,
        message: message,
      }).unwrap();

      toast.success(
        result.message ||
          "Your message was sent successfully. We'll get back to you soon."
      );
      setMessage(""); // Clear only the message field
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Something went wrong. Please try again later."
      );
    }
  };

  if (profileLoading) {
    return (
      <div className="w-full max-w-xl">
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-xl">
        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            disabled={submitting}
            className="w-full h-10 px-3 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-60"
          />
        </div>

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={submitting}
            className="w-full h-10 px-3 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-60"
          />
        </div>

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Messages"
            rows={5}
            disabled={submitting}
            className="w-full px-3 py-2 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none disabled:opacity-60"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#04243b] text-white py-3 rounded-lg text-sm font-medium hover:opacity-95 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Sending..." : "Send Your Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
