/** @format */

import baseApi from "../api/baseAPI";

const accountSetupAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Update user profile (Step 1: Personal Info)
    updateUserProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/api/accounts/profile-update/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get license types
    getLicenseTypes: builder.query<any, void>({
      query: () => ({
        url: `/api/jobs/licence-types/`,
        method: "GET",
      }),
    }),

    // Upload license (Step 2: License Upload)
    uploadLicense: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/api/accounts/licences/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useGetLicenseTypesQuery,
  useUploadLicenseMutation,
} = accountSetupAPI;
