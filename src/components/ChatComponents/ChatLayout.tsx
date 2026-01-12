/** @format */

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
      setActive(contacts[0].id);
      initialized.current = true;
    }
  }, [contacts]);

  const activeContact = contacts.find((c) => c.id === active) || contacts[0];

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
        initialMessages={[
          {
            id: "m1",
            text: `You viewed ${activeContact?.name || "chat"}`,
            time: "12:25",
            date: "Today",
          },
          {
            id: "m2",
            fromMe: true,
            text: "Hey, what's up? How are you doing? I'm looking to make a deal with you.",
            time: "11:25",
            date: "Today",
          },
        ]}
      />
    </div>
  );
}
