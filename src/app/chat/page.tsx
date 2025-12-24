/** @format */

import React from "react";
import ChatLayout from "@/components/ChatComponents/ChatLayout";

const ChatPage = () => {
  return (
    <div className=" p-6 ">
      <div className="max-w-[2000px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chat</h1>

        <ChatLayout />
      </div>
    </div>
  );
};

export default ChatPage;
