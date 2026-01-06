/** @format */

import baseAPI from "../api/baseAPI";

interface SupportMessageRequest {
  full_name: string;
  email: string;
  message: string;
}

interface SupportMessageResponse {
  success: boolean;
  message: string;
}

const supportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendSupportMessage: builder.mutation<
      SupportMessageResponse,
      SupportMessageRequest
    >({
      query: (data) => ({
        url: `/api/jobs/support-message/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendSupportMessageMutation } = supportAPI;
