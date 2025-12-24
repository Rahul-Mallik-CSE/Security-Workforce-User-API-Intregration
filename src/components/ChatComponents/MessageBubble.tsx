/** @format */

"use client";

import React from "react";

interface Props {
  text: string;
  fromMe?: boolean;
  time?: string;
}

export default function MessageBubble({ text, fromMe = false, time }: Props) {
  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} py-1`}>
      <div className="flex flex-col items-end max-w-[70%]">
        <div
          className={`px-4 py-2.5 rounded-lg text-sm leading-5 ${
            fromMe
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          {text}
        </div>
        {time && (
          <div
            className={`text-xs mt-1 flex items-center gap-1 ${
              fromMe ? "text-gray-400" : "text-gray-400"
            }`}
          >
            <span>{time}</span>
            {fromMe && (
              <span className="text-blue-500">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 4.5L7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
