/** @format */

"use client";

import { ArrowLeft, Bell, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useGetNotificationsQuery } from "@/redux/freatures/notificationAPI";
import { NotificationData } from "@/types/AllTypes";

const NotificationsPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetNotificationsQuery();

  const handleBack = () => {
    router.back();
  };

  const getNotificationIcon = (noteType: string) => {
    switch (noteType) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (noteType: string) => {
    switch (noteType) {
      case "success":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "border-l-4 border-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="max-w-[2000px] mx-auto p-6 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-3xl font-semibold text-black">Notifications</h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading notifications...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">
                Failed to load notifications. Please try again.
              </p>
            </div>
          )}

          {data && data.data && data.data.length === 0 && (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications available.</p>
            </div>
          )}

          {data &&
            data.data &&
            data.data.map((notification: NotificationData) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm ${getNotificationStyle(
                  notification.note_type
                )}`}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.note_type)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700 mt-1">{notification.content}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
