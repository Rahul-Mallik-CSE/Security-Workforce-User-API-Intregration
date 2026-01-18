/** @format */

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useGetMessageListQuery } from "@/redux/freatures/chatAPI";

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
  chatId: string | null;
  participantIds?: number[];
}

export default function ChatWindow({
  contactName,
  contactAvatar,
  lastSeen,
  chatId,
  participantIds = [],
}: Props) {
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId);
  const wsRef = useRef<WebSocket | null>(null);

  // Clear local messages when chat changes
  if (currentChatId !== chatId) {
    setCurrentChatId(chatId);
    setLocalMessages([]);
  }

  // Fetch messages from API
  const { data: messageData, isLoading } = useGetMessageListQuery(
    chatId || "",
    {
      skip: !chatId,
    }
  );

  // Setup WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    const wsUrl = `ws://148.230.92.132:8001/ws/asc/update_chat_messages/?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);

        // Check if message is for the current chat
        if (data.chat_id && chatId && data.chat_id.toString() === chatId) {
          // Check if this is from the current user (echoed back)
          const isFromMe = !participantIds.includes(data.sender_id);

          // Skip adding if it's our own message (already added optimistically)
          if (isFromMe) {
            console.log("Skipping own message echo");
            return;
          }

          // Only add messages from other participants
          const newMessage: Message = {
            id: `ws-${data.id || Date.now()}`,
            fromMe: false,
            text: data.message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: "Today",
          };

          setLocalMessages((prev) => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    wsRef.current = ws;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [chatId, participantIds]);

  // Transform API messages to local format
  const apiMessages: Message[] = useMemo(() => {
    if (!messageData?.data) return [];

    return messageData.data.map((msg, index) => ({
      id: `msg-${index}`,
      // If sender ID matches any participant ID, message is from them (left side)
      // Otherwise, message is from me (right side)
      fromMe: !participantIds.includes(msg.sender.id),
      text: msg.text,
      time: new Date(msg.sender.last_activity).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Today",
    }));
  }, [messageData, participantIds]);

  // Combine API messages with local messages
  const allMessages = useMemo(() => {
    return [...apiMessages, ...localMessages];
  }, [apiMessages, localMessages]);

  const handleSend = (text: string) => {
    if (
      !chatId ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      console.error("WebSocket not connected or chat ID missing");
      return;
    }

    // Send message via WebSocket
    const messageData = {
      message: text,
      chat_id: parseInt(chatId),
    };

    try {
      wsRef.current.send(JSON.stringify(messageData));
      console.log("Message sent via WebSocket:", messageData);

      // Optimistically add message to UI
      const msg: Message = {
        id: String(Date.now()),
        fromMe: true,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "Today",
      };
      setLocalMessages((s) => [...s, msg]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Group messages by date
  const renderMessages = () => {
    const grouped: { [key: string]: Message[] } = {};
    allMessages.forEach((m) => {
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
    <div className="flex-1 flex flex-col h-[730px] ">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={contactAvatar || "/logo.png"}
              alt={contactName}
              width={40}
              height={40}
              className="object-cover"
              unoptimized
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
        {isLoading ? (
          <div className="text-center text-gray-400 mt-8">
            Loading messages...
          </div>
        ) : allMessages.length === 0 ? (
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
