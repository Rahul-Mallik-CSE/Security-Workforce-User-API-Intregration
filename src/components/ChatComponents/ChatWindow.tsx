/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  fromMe?: boolean;
  text: string;
  time?: string;
  date?: string;
}

interface Props {
  contactName: string;
  contactAvatar?: string;
  lastSeen?: string;
  initialMessages?: Message[];
}

export default function ChatWindow({
  contactName,
  contactAvatar,
  lastSeen,
  initialMessages = [],
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = (text: string) => {
    const msg: Message = {
      id: String(Date.now()),
      fromMe: true,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((s) => [...s, msg]);
    // auto-reply simulation
    setTimeout(() => {
      setMessages((s) => [
        ...s,
        {
          id: String(Date.now() + 1),
          text: "Thanks for your message, we'll check and reply soon.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 800);
  };

  // Group messages by date
  const renderMessages = () => {
    const grouped: { [key: string]: Message[] } = {};
    messages.forEach((m) => {
      const dateKey = m.date || "Today";
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(m);
    });

    return Object.keys(grouped).map((dateKey) => (
      <div key={dateKey}>
        <div className="text-center my-4">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {dateKey}
          </span>
        </div>
        {grouped[dateKey].map((m) => (
          <MessageBubble
            key={m.id}
            text={m.text}
            fromMe={!!m.fromMe}
            time={m.time}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex-1 flex flex-col ">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={contactAvatar || "/logo.png"}
              alt={contactName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-base font-semibold text-gray-900">
              {contactName}
            </div>
            <div className="text-xs text-gray-500">
              {lastSeen || "Last seen 7h ago"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-white">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            No messages yet. Start the conversation.
          </div>
        ) : (
          <div className="space-y-1">{renderMessages()}</div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
