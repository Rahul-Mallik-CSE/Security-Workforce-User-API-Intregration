/** @format */

import baseApi from "../api/baseAPI";
import { OperativeTrackerAPIResponse, RatingData } from "@/types/AllTypes";

const operativesTrackerAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOperativeTrackers: builder.query<OperativeTrackerAPIResponse, void>({
      query: () => "/api/jobs/company-operative-trackers-views/",
      providesTags: ["OperativeTrackers"],
    }),
    approveEngagement: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "PUT",
        body: { is_shift_end: true },
      }),
      invalidatesTags: ["OperativeTrackers"],
    }),
    rateOperative: builder.mutation<void, { id: number; data: RatingData }>({
      query: ({ id, data }) => ({
        url: `/api/jobs/rating-on-an-eng/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OperativeTrackers"],
    }),
  }),
});

export const {
  useGetOperativeTrackersQuery,
  useApproveEngagementMutation,
  useRateOperativeMutation,
} = operativesTrackerAPI;
