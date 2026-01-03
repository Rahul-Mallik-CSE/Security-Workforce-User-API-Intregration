/** @format */

import baseAPI from "../api/baseAPI";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    profileDetails: builder.query<any, void>({
      query: () => ({
        url: `api/accounts/user-profile/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),
  }),
});
export const { useProfileDetailsQuery } = authAPI;
