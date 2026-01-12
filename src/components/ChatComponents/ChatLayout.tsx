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
}

export default function ChatLayout() {
  const [active, setActive] = useState<string | null>(null);
  const { data: chatListData, isLoading } = useGetChatListQuery();
  const searchParams = useSearchParams();
  const chatIdFromUrl = searchParams.get("chatId");

  const contacts: Contact[] = useMemo(
    () =>
      chatListData?.data?.map((item) => ({
        id: item.id.toString(),
        name: `${item.participants[0]?.first_name} ${item.participants[0]?.last_name}`.trim(),
        lastMessage: item.last_message?.text || "No messages yet",
        avatar: getFullImageFullUrl(item.participants[0]?.image) || "/logo.png",
        time: item.last_message_time
          ? new Date(item.last_message_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date(item.updated_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
      })) || [],
    [chatListData]
  );

  const initialized = useRef(false);

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
      (chat) => chat.id.toString() === active
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
