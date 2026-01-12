/** @format */

import baseAPI from "../api/baseAPI";

interface Participant {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
}

interface LastMessage {
  id: number;
  text: string;
  sender_name: string;
  created_at: string;
}

interface ChatItem {
  id: number;
  participants: Participant[];
  last_message: LastMessage | null;
  last_message_time: string | null;
  updated_at: string;
}

interface ChatListResponse {
  success: boolean;
  message: string;
  data: ChatItem[];
}

const chatAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<ChatListResponse, void>({
      query: () => "/api/chat-note/chat-list/",
      providesTags: ["Chat"],
    }),
  }),
});

export const { useGetChatListQuery } = chatAPI;
