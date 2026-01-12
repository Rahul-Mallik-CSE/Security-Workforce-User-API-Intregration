/** @format */

import baseAPI from "../api/baseAPI";

interface Participant {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
  last_activity: string;
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

interface CreateChatRequest {
  user_list: number[];
  group_name: string;
}

interface CreateChatResponse {
  success: boolean;
  message: string;
  data: ChatItem;
}

interface MessageSender {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
  last_activity: string;
}

interface MessageItem {
  text: string;
  sender: MessageSender;
}

interface MessageListResponse {
  success: boolean;
  message: string;
  data: MessageItem[];
}

const chatAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<ChatListResponse, void>({
      query: () => "/api/chat-note/chat-list/",
      providesTags: ["Chat"],
    }),
    getMessageList: builder.query<MessageListResponse, string>({
      query: (chatId) => `/api/chat-note/message-list/${chatId}/`,
      providesTags: ["Chat"],
    }),
    createChat: builder.mutation<CreateChatResponse, CreateChatRequest>({
      query: (data) => ({
        url: "/api/chat-note/chat-list/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useGetMessageListQuery,
  useCreateChatMutation,
} = chatAPI;
