/** @format */

import baseApi from "../api/baseAPI";
import { PreferredOperativesAPIResponse } from "@/types/AllTypes";

const preferredOperativesAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreferredOperatives: builder.query<PreferredOperativesAPIResponse, void>(
      {
        query: () => "/api/jobs/company-perfromed-operatives/",
        providesTags: ["PreferredOperatives"],
      },
    ),
    getHiddenPreferredOperatives: builder.query<
      PreferredOperativesAPIResponse,
      void
    >({
      query: () => "/api/jobs/company-perfromed-operatives/?type=hidden",
      providesTags: ["PreferredOperatives"],
    }),
    saveOperativeNote: builder.mutation<void, { id: number; note: string }>({
      query: ({ id, note }) => ({
        url: `/api/jobs/company-perfromed-operatives/${id}/`,
        method: "PUT",
        body: { note },
      }),
      invalidatesTags: ["PreferredOperatives"],
    }),
    updatePreferredOperativeStatus: builder.mutation<
      void,
      { id: number; status: boolean }
    >({
      query: ({ id, status }) => ({
        url: `/api/jobs/company-perfromed-operatives/${id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["PreferredOperatives"],
    }),
  }),
});

export const {
  useGetPreferredOperativesQuery,
  useGetHiddenPreferredOperativesQuery,
  useSaveOperativeNoteMutation,
  useUpdatePreferredOperativeStatusMutation,
} = preferredOperativesAPI;
