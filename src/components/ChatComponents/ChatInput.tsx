/** @format */

"use client";

import React, { useState } from "react";
import { Mic, Send } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 px-4 py-2.5 rounded-lg bg-gray-50 border-0 focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
        />

        <button
          type="submit"
          className= "text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
