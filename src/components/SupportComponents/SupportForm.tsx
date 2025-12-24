/** @format */

"use client";

import React, { useState } from "react";

export default function SupportForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 800));
      setSuccess(true);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-xl">
        {success && (
          <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-3 text-green-800">
            Your message was sent successfully. We&apos;ll get back to you soon.
          </div>
        )}

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full h-10 px-3 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            className="w-full h-10 px-3 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            className="w-full px-3 py-2 rounded-md bg-white border border-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
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
