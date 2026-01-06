/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import SubscriptionModal from "./SubscriptionModal";
import { useGetInvoicesQuery } from "@/redux/freatures/settingAPI";

const BillingSetting = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const { data: invoicesData, isLoading } = useGetInvoicesQuery();

  const invoices =
    invoicesData?.data?.map((invoice) => ({
      id: `Invoice ${String(invoice.id).padStart(3, "0")}`,
      date: new Date(invoice.invoice_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      duration: invoice.plan.duraton_day,
      price: `$${parseFloat(invoice.price).toFixed(2)}`,
    })) || [];

  return (
    <div className="px-8 pb-16 ">
      <div className="flex items-center justify-end border-border ">
        {/* Pay Bill Button */}
        <Button
          onClick={() => setIsSubscriptionModalOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white gap-2 rounded-lg flex items-center -mt-10 "
        >
          Pay bill
        </Button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Previous Invoice</h2>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading invoices...</p>
          </div>
        </div>
      ) : (
        <div className=" rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 bg-white border-b border-gray-200 px-6 py-3">
            <div className="text-sm font-medium text-gray-700">Invoice Id</div>
            <div className="text-sm font-medium text-gray-700">Date</div>
            <div className="text-sm font-medium text-gray-700">Duration</div>
            <div className="text-sm font-medium text-gray-700">Price</div>
          </div>

          {/* Table Body */}
          <div className="bg-white">
            {invoices.length > 0 ? (
              invoices.map((invoice, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="text-sm text-gray-700">{invoice.id}</div>
                  <div className="text-sm text-gray-700">{invoice.date}</div>
                  <div className="text-sm text-gray-700">
                    {invoice.duration} days
                  </div>
                  <div className="text-sm text-gray-700">{invoice.price}</div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                No invoices available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default BillingSetting;
