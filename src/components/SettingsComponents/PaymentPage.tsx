/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentUrl = searchParams.get("paymentUrl");

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

        {/* Payment iframe */}
        <div className="w-full">
          {paymentUrl ? (
            <iframe
              src={paymentUrl}
              className="w-full min-h-screen border-0 rounded-lg"
              title="Payment Checkout"
              style={{ height: "calc(100vh - 100px)" }}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg shadow-sm">
              <div className="text-center">
                <p className="text-gray-600 text-lg">No payment URL provided</p>
                <Button
                  onClick={() => router.push("/settings")}
                  className="mt-4 bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Go to Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
