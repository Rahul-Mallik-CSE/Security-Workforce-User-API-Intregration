/** @format */

import baseAPI from "../api/baseAPI";
import { NotificationsAPIResponse } from "@/types/AllTypes";

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationsAPIResponse, void>({
      query: () => "/api/chat-note/notifications/",
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationAPI;
export default notificationAPI;
