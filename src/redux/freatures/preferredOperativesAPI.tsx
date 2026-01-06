/** @format */

import baseApi from "../api/baseAPI";
import { PreferredOperativesAPIResponse } from "@/types/AllTypes";

const preferredOperativesAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreferredOperatives: builder.query<PreferredOperativesAPIResponse, void>(
      {
        query: () => "/api/jobs/company-perfromed-operatives/",
        providesTags: ["PreferredOperatives"],
      }
    ),
    saveOperativeNote: builder.mutation<void, { id: number; note: string }>({
      query: ({ id, note }) => ({
        url: `/api/jobs/company-perfromed-operatives/${id}/`,
        method: "PATCH",
        body: { note },
      }),
      invalidatesTags: ["PreferredOperatives"],
    }),
    deletePreferredOperative: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/jobs/company-perfromed-operatives/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["PreferredOperatives"],
    }),
  }),
});

export const {
  useGetPreferredOperativesQuery,
  useSaveOperativeNoteMutation,
  useDeletePreferredOperativeMutation,
} = preferredOperativesAPI;
