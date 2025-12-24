/** @format */

import React from "react";
import SignInForm from "@/components/AuthComponents/SignInForm";
import RightBanner from "@/components/AuthComponents/RightBanner";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <SignInForm />
      </div>

      {/* Right Side - Banner */}
      <div className="hidden lg:block flex-1">
        <RightBanner />
      </div>
    </div>
  );
};

export default SignInPage;
