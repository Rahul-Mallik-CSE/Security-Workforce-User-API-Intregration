/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import SubscriptionModal from "./SubscriptionModal";

const BillingSetting = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const invoices = [
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
    { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$49" },
  ];

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

      {/* Table */}
      <div className=" rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 bg-white border-b border-gray-200 px-6 py-3">
          <div className="text-sm font-medium text-gray-700">Invoice Id</div>
          <div className="text-sm font-medium text-gray-700">Date</div>
          <div className="text-sm font-medium text-gray-700">Plan</div>
          <div className="text-sm font-medium text-gray-700">Price</div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {invoices.map((invoice, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="text-sm text-gray-700">{invoice.id}</div>
              <div className="text-sm text-gray-700">{invoice.date}</div>
              <div className="text-sm text-gray-700">{invoice.plan}</div>
              <div className="text-sm text-gray-700">{invoice.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default BillingSetting;
