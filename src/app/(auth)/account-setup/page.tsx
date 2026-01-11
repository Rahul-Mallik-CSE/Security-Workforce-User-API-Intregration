/** @format */

import RightBanner from "@/components/AuthComponents/RightBanner";
import AccountSetupSteps from "@/components/AuthComponents/SignInComponents/AccountSetupSteps";
import React from "react";

const AccountSetupPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <AccountSetupSteps />
      </div>

      {/* Right Side - Banner */}
      <div className="hidden lg:block flex-1">
        <RightBanner />
      </div>
    </div>
  );
};

export default AccountSetupPage;
