/** @format */

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useGetChatListQuery } from "@/redux/freatures/chatAPI";
import { getFullImageFullUrl } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  avatar?: string;
  time?: string;
  isRead?: boolean;
}

export default function ChatLayout() {
  const [active, setActive] = useState<string | null>(null);
  const [lastMessageUpdates, setLastMessageUpdates] = useState<{
    [chatId: string]: { text: string; time: string; isRead: boolean };
  }>({});
  const { data: chatListData, isLoading } = useGetChatListQuery();
  const searchParams = useSearchParams();
  const chatIdFromUrl = searchParams.get("chatId");
  const wsRef = useRef<WebSocket | null>(null);

  const contacts: Contact[] = useMemo(
    () =>
      chatListData?.data?.map((item) => {
        const chatId = item.id.toString();
        const realtimeUpdate = lastMessageUpdates[chatId];

        return {
          id: chatId,
          name: `${item.participants[0]?.first_name} ${item.participants[0]?.last_name}`.trim(),
          lastMessage:
            realtimeUpdate?.text ||
            item.last_message?.text ||
            "No messages yet",
          avatar:
            getFullImageFullUrl(item.participants[0]?.image) || "/logo.png",
          time:
            realtimeUpdate?.time ||
            (item.last_message_time
              ? new Date(item.last_message_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(item.updated_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })),
          isRead: item.last_message?.is_readed ?? true,
        };
      }) || [],
    [chatListData, lastMessageUpdates],
  );

  const initialized = useRef(false);

  // Get all participant IDs for unread count logic
  const allParticipantIds = useMemo(() => {
    if (!chatListData?.data) return [];
    const allIds = new Set<number>();
    chatListData.data.forEach((chat) => {
      chat.participants.forEach((p) => allIds.add(p.id));
    });
    return Array.from(allIds);
  }, [chatListData]);

  // Setup WebSocket connection for real-time chat list updates
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const wsUrl = `ws://148.230.92.132:8001/ws/asc/update_chat_messages/?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("ChatLayout WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("ChatLayout WebSocket message:", data);

        if (data.chat_id && data.message) {
          // Check if message is from another user (not current user)
          const isFromOtherUser =
            data.sender_id && allParticipantIds.includes(data.sender_id);

          // Update the last message for this chat
          setLastMessageUpdates((prev) => ({
            ...prev,
            [data.chat_id.toString()]: {
              text: data.message,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isRead: false,
            },
          }));

          // Only increment unread count if message is from another user
          if (isFromOtherUser) {
            window.dispatchEvent(new CustomEvent("unreadCountIncrement"));
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("ChatLayout WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("ChatLayout WebSocket disconnected");
    };

    wsRef.current = ws;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [allParticipantIds]);

  useEffect(() => {
    if (!initialized.current && contacts.length > 0) {
      // If chatId is provided in URL, select that chat
      if (chatIdFromUrl) {
        const chatExists = contacts.find((c) => c.id === chatIdFromUrl);
        if (chatExists) {
          setActive(chatIdFromUrl);
        } else {
          setActive(contacts[0].id);
        }
      } else {
        setActive(contacts[0].id);
      }
      initialized.current = true;
    }
  }, [contacts, chatIdFromUrl]);

  const activeContact = contacts.find((c) => c.id === active) || contacts[0];

  // Get participant IDs for the active chat
  const activeParticipantIds = useMemo(() => {
    if (!active || !chatListData?.data) return [];
    const activeChatData = chatListData.data.find(
      (chat) => chat.id.toString() === active,
    );
    return activeChatData?.participants.map((p) => p.id) || [];
  }, [active, chatListData]);

  if (isLoading) {
    return (
      <div className="flex bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 min-h-[400px] items-center justify-center">
        <div>Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <ChatList
        contacts={contacts}
        activeId={active}
        onSelect={(id) => setActive(id)}
      />
      <ChatWindow
        contactName={activeContact?.name || "No chats"}
        contactAvatar={activeContact?.avatar || "/logo.png"}
        lastSeen="Last seen recently"
        chatId={active}
        participantIds={activeParticipantIds}
      />
    </div>
  );
}
