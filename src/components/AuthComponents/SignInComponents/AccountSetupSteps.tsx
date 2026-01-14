/** @format */

"use client";

import React, { useState } from "react";
import CompanyInfoStep from "./CompanyInfoStep";
import LicenseUploadStep from "./LicenseUploadStep";
import VerificationSuccessStep from "./VerificationSuccessStep";
import { useRouter } from "next/navigation";

const AccountSetupSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: "",
    phoneNumber: "",
    profileImage: null as File | null,
    // Step 2: License Upload
    stateTerritory: "",
    licenseType: "",
    licenseNumber: "",
    licenseFile: null as File | null,
    licenseExpiryDate: "",
  });

  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Licence Upload" },
    { number: 3, label: "Confirmation Screen" },
  ];

  const handleNextStep = () => {
    if (currentStep === 3) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="w-full max-w-md">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step.number
                    ? "bg-orange-500 text-white"
                    : currentStep > step.number
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-0.5 mx-2 ${
                  currentStep > step.number ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <CompanyInfoStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <LicenseUploadStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 3 && <VerificationSuccessStep onNext={handleNextStep} />}
    </div>
  );
};

export default AccountSetupSteps;
