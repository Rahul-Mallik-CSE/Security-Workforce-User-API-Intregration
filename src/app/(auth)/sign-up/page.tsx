/** @format */

import SignUpForm from "@/components/AuthComponents/SignUpForm";
import RightBanner from "@/components/AuthComponents/RightBanner";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <SignUpForm />
      </div>

      {/* Right Side - Banner */}
      <div className="hidden lg:block flex-1">
        <RightBanner />
      </div>
    </div>
  );
};

export default SignUpPage;
