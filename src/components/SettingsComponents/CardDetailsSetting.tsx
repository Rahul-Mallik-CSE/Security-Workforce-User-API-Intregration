/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetCardDetailsQuery,
  useUpdateCardDetailsMutation,
} from "@/redux/freatures/settingAPI";
import { toast } from "react-toastify";

const CardDetailsSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });

  const { data: cardData, isLoading } = useGetCardDetailsQuery();
  const [updateCardDetails, { isLoading: isUpdating }] =
    useUpdateCardDetailsMutation();

  useEffect(() => {
    if (cardData?.card_details) {
      const card = cardData.card_details;
      // Format card number with spaces (groups of 4)
      const cardNumber = String(card.card_number);
      const formattedCardNumber =
        cardNumber.match(/.{1,4}/g)?.join(" ") || cardNumber;

      // Format expiry date from YYYY-MM-DD to MM/YY
      const expiryDate = card.expire_date
        ? new Date(card.expire_date)
            .toLocaleDateString("en-US", {
              month: "2-digit",
              year: "2-digit",
            })
            .replace("/", " / ")
        : "";

      setFormData({
        cardholderName: card.card_holder || "",
        cardNumber: formattedCardNumber,
        expiryDate: expiryDate,
        cvv: String(card.cvc),
        billingAddress: card.billing_address || "",
      });
    }
  }, [cardData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      // Convert expiry date from MM / YY to YYYY-MM-DD
      const [month, year] = formData.expiryDate.split(" / ");
      const fullYear = `20${year}`;
      const expireDate = `${fullYear}-${month.padStart(2, "0")}-01`;

      await updateCardDetails({
        card_holder: formData.cardholderName,
        card_number: formData.cardNumber.replace(/\s/g, ""),
        expire_date: expireDate,
        cvc: parseInt(formData.cvv),
        billing_address: formData.billingAddress,
      }).unwrap();
      toast.success("Card details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update card details. Please try again.");
      console.error("Update error:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (cardData?.card_details) {
      const card = cardData.card_details;
      const cardNumber = String(card.card_number);
      const formattedCardNumber =
        cardNumber.match(/.{1,4}/g)?.join(" ") || cardNumber;
      const expiryDate = card.expire_date
        ? new Date(card.expire_date)
            .toLocaleDateString("en-US", {
              month: "2-digit",
              year: "2-digit",
            })
            .replace("/", " / ")
        : "";

      setFormData({
        cardholderName: card.card_holder || "",
        cardNumber: formattedCardNumber,
        expiryDate: expiryDate,
        cvv: String(card.cvc),
        billingAddress: card.billing_address || "",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="px-8 pb-16 max-w-md flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading card details...</p>
        </div>
      </div>
    );
  }

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
              onChange={(e) => {
                // Allow only numbers and spaces, format as groups of 4
                const value = e.target.value.replace(/\D/g, "");
                const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                handleInputChange("cardNumber", formatted);
              }}
              placeholder="**** **** **** ****"
              maxLength={19}
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
              onChange={(e) => {
                // Format as MM / YY
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 2) {
                  handleInputChange("expiryDate", value);
                } else {
                  handleInputChange(
                    "expiryDate",
                    `${value.slice(0, 2)} / ${value.slice(2, 4)}`
                  );
                }
              }}
              placeholder="MM / YY"
              maxLength={7}
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleInputChange("cvv", value);
              }}
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
              disabled={isUpdating}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save & Changes"}
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
