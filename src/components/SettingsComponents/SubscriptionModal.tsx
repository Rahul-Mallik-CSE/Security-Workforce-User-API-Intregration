/** @format */

"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetPaymentPlansQuery } from "@/redux/freatures/settingAPI";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data: plansData, isLoading } = useGetPaymentPlansQuery();

  // Get company plan
  const companyPlan = plansData?.plans?.find(
    (plan) => plan.plan_for === "company"
  );

  const benefits = [
    "Access to thousands of available guards. Recruit all-stars in minutes, not months.",
    "Search and select by performance rating",
    "Locate or deploy guards by location with GPS mapping",
    "Onboard and offboard via in-app Smart Contract",
    "Fill your entire roster with one job post",
    "Update work instructions with in-app chat",
  ];

  const handleSubscribeNow = () => {
    onClose();
    router.push("/settings/payment");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Join Now!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Subtitle */}
          <p className="text-center text-sm text-gray-600">
            To receive job notifications and apply for available shifts,
            you&apos;ll need to subscribe to Securiverse.
          </p>

          {/* Price */}
          <div className="text-center">
            {isLoading ? (
              <div className="text-2xl text-gray-400">Loading...</div>
            ) : (
              <>
                <span className="text-4xl font-bold text-orange-500">
                  ${companyPlan?.price || "49.00"}
                </span>
                <span className="text-gray-600">
                  /{companyPlan?.duraton_day || 30} days
                </span>
              </>
            )}
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Benefits:</h3>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubscribeNow}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg text-sm font-medium"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
