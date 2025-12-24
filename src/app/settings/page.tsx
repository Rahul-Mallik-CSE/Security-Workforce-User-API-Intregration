/** @format */

import { SettingTabs } from "@/components/SettingsComponents/SettingTabs";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="max-w-[2000px] mx-auto p-6 ">
      <div className=" ">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Settings</h1>
      </div>
      <div className="bg-white rounded-xl min-h-[740px]">
        <SettingTabs />
      </div>
    </div>
  );
};

export default SettingsPage;
