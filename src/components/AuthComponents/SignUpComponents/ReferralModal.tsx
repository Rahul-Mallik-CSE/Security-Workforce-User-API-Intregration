/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Copy, Gift } from "lucide-react";
import Image from "next/image";

interface ReferralModalProps {
  onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://example.com/signup?refer_code=A2dN91Tt";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Refer and <span className="text-orange-500">Get Benefits</span>
          </h2>
          <p className="text-sm text-gray-600">
            Share this referral code with your network
          </p>
          <p className="text-sm text-gray-600 mb-6">
            of aspiring Member benefits
          </p>

          {/* Benefits List */}
          <div className="text-left mb-6">
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Copy referral link</li>
              <li>
                <span className="font-semibold">
                  Share with Companies and Security Operatives
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  Enjoy Upgrades, Discounts and other benefits
                </span>
              </li>
            </ol>
          </div>

          {/* Gift Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-orange-200"></div>
              <div className="absolute -top-1 left-8 w-2 h-2 rounded-full bg-yellow-200"></div>
              <div className="absolute top-2 -right-2 w-2 h-2 rounded-full bg-orange-300"></div>
              <div className="absolute -bottom-2 left-4 w-2 h-2 rounded-full bg-red-200"></div>
              <div className="absolute bottom-0 -right-1 w-3 h-3 rounded-full bg-yellow-300"></div>

              {/* Gift Box */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center transform rotate-6">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Referral Link Section */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Your referral link:
            </p>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-blue-600 outline-none"
              />
              <button
                onClick={handleCopy}
                className="text-orange-500 hover:text-orange-600 flex-shrink-0"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-1">
                Copied to clipboard!
              </p>
            )}
          </div>
        </div>

        {/* Invite Friends Button */}
        <Button
          onClick={onClose}
          className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold text-base"
        >
          Invite friends
        </Button>
      </div>
    </div>
  );
};

export default ReferralModal;
