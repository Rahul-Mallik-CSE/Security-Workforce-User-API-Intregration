/** @format */

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import { FiCreditCard } from "react-icons/fi";
import AccountSetting from "./AccountSetting";
import CardDetailsSetting from "./CardDetailsSetting";
import BillingSetting from "./BillingSetting";

export function SettingTabs() {
  return (
    <div className="py-1.5">
      <Tabs defaultValue="account" className="w-full">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-8">
          <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto gap-8">
            <TabsTrigger
              value="account"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 text-foreground rounded-none px-0 py-0"
            >
              <span className="flex items-center gap-2 pl-3">
                <User />
                Account
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="billings"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 text-foreground rounded-none px-0 py-0"
            >
              <span className="flex items-center gap-2 pl-3">
                <FiCreditCard />
                Billings
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="card"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 text-foreground rounded-none px-0 py-0"
            >
              <span className="flex items-center gap-2 pl-3">
                <FiCreditCard />
                Card Details
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <TabsContent value="account" className="space-y-6">
          <AccountSetting />
        </TabsContent>

        <TabsContent value="billings" className="">
          <BillingSetting />
        </TabsContent>

        <TabsContent value="card" className="">
          <CardDetailsSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
