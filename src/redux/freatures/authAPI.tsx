/** @format */

import { send } from "process";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // updatePassword: builder.mutation({
    //   query: (data) => ({
    //     url: `auth/change-password`,
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // forgetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/forgot-password`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // verifyEmail: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/verify-email`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/reset-password`,
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<any, any>({
      query: ({ data, referralToken }) => ({
        url: `/api/auth/signup/${
          referralToken ? `?referral_token=${referralToken}` : ""
        }`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `/api/auth/verify/${email}/`,
        method: "POST",
        body: { otp },
      }),
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: `/api/auth/forgetpassword/`,
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtpForForget: builder.mutation<any, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `/api/auth/vefiry_for_forget/${email}/`,
        method: "POST",
        body: { otp },
      }),
    }),
    resetPassword: builder.mutation<
      any,
      { new_password: string; token: string }
    >({
      query: ({ new_password, token }) => ({
        url: `/api/auth/reset_password/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { new_password },
      }),
    }),
    googleAuth: builder.mutation<any, { id_token: string; user_type: string }>({
      query: ({ id_token, user_type }) => ({
        url: `/api/auth/google/`,
        method: "POST",
        body: { id_token, user_type },
      }),
    }),
  }),
});

export const {
  //   useUpdatePasswordMutation,
  //   useResetPasswordMutation,
  //   useVerifyEmailMutation,
  //   useForgetPasswordMutation,
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useVerifyOtpForForgetMutation,
  useResetPasswordMutation,
  useGoogleAuthMutation,
} = authAPI;
