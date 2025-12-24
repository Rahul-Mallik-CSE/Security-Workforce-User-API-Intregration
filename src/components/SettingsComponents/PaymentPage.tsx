/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const PaymentPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "name@gmail.com",
    nameOnCard: "",
    cardNumber: "",
    month: "",
    year: "",
    securityCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log("Subscription submitted:", formData);
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-[2000px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Section - Subscription Details */}
          <div className=" rounded-lg px-8  h-fit">
            {/* Logo */}
            <div className="flex  mb-6">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center p-2">
                <Image
                  src="/logo.png"
                  alt="Securiverse Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold  mb-2">
              Subscribe To Securiverse Professional
            </h2>

            {/* Price */}
            <div className=" mb-8">
              <span className="text-5xl font-bold">$49</span>
              <span className="text-gray-500 ml-2">/per month</span>
            </div>

            {/* Pricing Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">1x Paid User</span>
                <span className="text-gray-900 font-medium">$49.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    Total due today
                  </span>
                  <span className="text-gray-900 font-semibold">$49.00</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Taxes included in the subscription price
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Payment Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <form className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Credit Card Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Credit Card Details
                </h3>

                {/* Payment Method Icons */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="flex gap-3">
                    <div className="w-12 h-8 flex items-center justify-center">
                      <div className="w-10 h-6 bg-red-500 rounded"></div>
                    </div>
                    <div className="w-12 h-8 flex items-center justify-center">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    </div>
                    <div className="w-12 h-8 flex items-center justify-center">
                      <div className="w-10 h-6 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="w-12 h-8 flex items-center justify-center">
                      <div className="w-10 h-6 bg-orange-400 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Name on Card */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on card
                  </label>
                  <Input
                    type="text"
                    placeholder="Meet Patel"
                    value={formData.nameOnCard}
                    onChange={(e) =>
                      handleInputChange("nameOnCard", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card number
                  </label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    maxLength={19}
                    className="w-full"
                  />
                </div>

                {/* Card Expiration */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card expiration
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      value={formData.month}
                      onValueChange={(value) =>
                        handleInputChange("month", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, "0");
                          return (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.year}
                      onValueChange={(value) =>
                        handleInputChange("year", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = (2025 + i).toString();
                          return (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Card Security Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Security Code
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Code"
                      value={formData.securityCode}
                      onChange={(e) =>
                        handleInputChange("securityCode", e.target.value)
                      }
                      maxLength={4}
                      className="w-full pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">?</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscribe Button */}
                <Button
                  type="button"
                  onClick={handleSubscribe}
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3 rounded-lg text-sm font-medium"
                >
                  Subscribe
                </Button>

                {/* Terms Text */}
                <p className="text-xs text-center text-gray-500 mt-4">
                  By providing your card information, you allow Securiverse, to
                  charge your card for future payments in accordance with their
                  terms.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
