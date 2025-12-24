/** @format */

import React from "react";
import SupportForm from "@/components/SupportComponents/SupportForm";

const SupportPage = () => {
  return (
    <div className="min-h-screen p-6  ">
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Support</h1>

        <div className="">
          <SupportForm />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
