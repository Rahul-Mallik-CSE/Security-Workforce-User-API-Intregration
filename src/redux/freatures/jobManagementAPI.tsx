/** @format */

import baseApi from "../api/baseAPI";

const jobManagementAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all job posts
    getJobPosts: builder.query({
      query: () => ({
        url: `/api/jobs/job-posts/`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Get license types
    getLicenseTypes: builder.query({
      query: () => ({
        url: `/api/jobs/licence-types/`,

        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Get certificate types
    getCertificateTypes: builder.query({
      query: () => ({
        url: `/api/jobs/certificate-types/`,

        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Create job post
    createJobPost: builder.mutation({
      query: (data) => ({
        url: `/api/jobs/job-posts/`,

        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // Get job details by ID
    getJobDetails: builder.query({
      query: (id) => ({
        url: `/api/jobs/job-details/${id}/`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Select an operative for a job
    selectOperative: builder.mutation({
      query: ({ jobId, applicationId }) => ({
        url: `/api/jobs/job-select-an-operative/${jobId}/${applicationId}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Job"],
    }),

    // Remove an operative from selected list
    removeOperative: builder.mutation({
      query: ({ jobId, applicationId }) => ({
        url: `/api/jobs/job-select-an-operative/${jobId}/${applicationId}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["Job"],
    }),

    // Delete a job post
    deleteJobPost: builder.mutation({
      query: (jobId) => ({
        url: `/api/jobs/job-posts/${jobId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),

    // Complete job selection (delete job details)
    completeJobSelection: builder.mutation({
      query: (jobId) => ({
        url: `/api/jobs/job-details/${jobId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobPostsQuery,
  useGetLicenseTypesQuery,
  useGetCertificateTypesQuery,
  useCreateJobPostMutation,
  useGetJobDetailsQuery,
  useSelectOperativeMutation,
  useRemoveOperativeMutation,
  useDeleteJobPostMutation,
  useCompleteJobSelectionMutation,
} = jobManagementAPI;
