/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CardDetailsSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "John Smith",
    cardNumber: "**** **** **42 4242",
    expiryDate: "08 / 27",
    cvv: "***",
    billingAddress: "123 George Street, Sydney, Australia",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Save logic here
    console.log("Saving card details:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset formData if needed
  };

  return (
    <div className="px-8 pb-16 max-w-md">
      <h2 className="text-lg font-semibold mb-6">
        For your Subscription to Securiverse
      </h2>

      <div className="space-y-4">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={formData.cardholderName}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="**** **** **** ****"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={formData.cardNumber}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date (MM/YY)
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              placeholder="MM / YY"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={formData.expiryDate}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          )}
        </div>

        {/* CVV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              placeholder="***"
              maxLength={3}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={formData.cvv}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          )}
        </div>

        {/* Billing Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Billing Address
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.billingAddress}
              onChange={(e) =>
                handleInputChange("billingAddress", e.target.value)
              }
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={formData.billingAddress}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing ? (
          <div className="pt-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg text-sm font-medium"
            >
              Change Card Details
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSaveChanges}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg text-sm font-medium"
            >
              Save & Changes
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg text-sm font-medium"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetailsSetting;
