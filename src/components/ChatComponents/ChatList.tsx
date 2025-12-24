/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  avatar?: string;
  unread?: number;
  time?: string;
}

interface Props {
  contacts: Contact[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatList({ contacts, activeId, onSelect }: Props) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = contacts.filter((c) => {
    const matchesFilter = filter === "all" || (filter === "unread" && c.unread);
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-[calc(80vh-4rem)] flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages or contacts..."
            className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`text-sm font-medium pb-1 ${
            filter === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`text-sm font-medium pb-1 ${
            filter === "unread"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-auto">
        {filtered.map((c) => {
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                active ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                <Image
                  src={c.avatar || "/logo.png"}
                  alt={c.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm text-gray-900 truncate">
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-400 ml-2 shrink-0">
                    {c.time || "12:25"}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 truncate">
                    {c.lastMessage}
                  </div>
                  {c.unread ? (
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs ml-2 shrink-0">
                      {c.unread}
                    </div>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
