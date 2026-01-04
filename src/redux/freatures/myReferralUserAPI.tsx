/** @format */

import baseApi from "../api/baseAPI";

const myReferralUserAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get referral users
    getReferralUsers: builder.query({
      query: () => ({
        url: `/api/accounts/user-refarral-users/`,
        method: "GET",
      }),
      providesTags: ["Referral"],
    }),
  }),
});

export const { useGetReferralUsersQuery } = myReferralUserAPI;
