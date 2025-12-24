/** @format */

"use client";

import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const seedContacts = [
  {
    id: "c1",
    name: "X_AE_A-13b",
    lastMessage: "Enter your message description here...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c2",
    name: "Pippins McGray",
    lastMessage: "Please call me back on 08193843...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c3",
    name: "McKinsey Vermillion",
    lastMessage: "Enter your message description here...",
    avatar: "/logo.png",
    time: "12:25",
    unread: 1,
  },
  {
    id: "c4",
    name: "X_AE_A-13b",
    lastMessage: "Enter your message description here...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c5",
    name: "Pippins McGray",
    lastMessage: "Please call me back on 08193843...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c6",
    name: "X_AE_A-13b",
    lastMessage: "Enter your message description here...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c7",
    name: "Pippins McGray",
    lastMessage: "Please call me back on 08193843...",
    avatar: "/logo.png",
    time: "12:25",
  },
  {
    id: "c8",
    name: "Oarack Babama",
    lastMessage: "Enter your message description here...",
    avatar: "/logo.png",
    time: "12:25",
    unread: 1,
  },
];

export default function ChatLayout() {
  const [active, setActive] = useState<string | null>(seedContacts[2].id);

  const activeContact =
    seedContacts.find((c) => c.id === active) || seedContacts[2];

  return (
    <div className="flex bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <ChatList
        contacts={seedContacts}
        activeId={active}
        onSelect={(id) => setActive(id)}
      />
      <ChatWindow
        contactName={activeContact.name}
        contactAvatar={activeContact.avatar}
        lastSeen="Last seen 7h ago"
        initialMessages={[
          {
            id: "m1",
            text: "You viewed X_AE_A-13b",
            time: "12:25",
            date: "25 April",
          },
          {
            id: "m2",
            fromMe: true,
            text: "Hey, what's up? How are you doing? am looking to make a deal with you.",
            time: "11:25",
            date: "25 April",
          },
        ]}
      />
    </div>
  );
}
