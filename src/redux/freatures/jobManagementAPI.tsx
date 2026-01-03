/** @format */

import baseApi from "../api/baseAPI";

const jobManagementAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get license types
    getLicenseTypes: builder.query({
      query: () => ({
        url: `api/jobs/licence-types/`,

        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Get certificate types
    getCertificateTypes: builder.query({
      query: () => ({
        url: `api/jobs/certificate-types/`,

        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Create job post
    createJobPost: builder.mutation({
      query: (data) => ({
        url: `api/jobs/job-posts/`,

        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetLicenseTypesQuery,
  useGetCertificateTypesQuery,
  useCreateJobPostMutation,
} = jobManagementAPI;
