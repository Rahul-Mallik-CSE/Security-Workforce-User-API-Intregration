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
  is_readed: boolean;
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

interface SendMessageRequest {
  chat_id: number;
  message: string;
}

interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    chat_id: number;
    sender_id: number;
    message: string;
  };
}

interface UnreadMessagesCountResponse {
  success: boolean;
  message: string;
  total_unread_inboxes: number;
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
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({
        url: "/api/chat-note/send-message/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    getUnreadMessagesCount: builder.query<UnreadMessagesCountResponse, void>({
      query: () => "/api/chat-note/unread-messages-count/",
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useGetMessageListQuery,
  useCreateChatMutation,
  useSendMessageMutation,
  useGetUnreadMessagesCountQuery,
} = chatAPI;
