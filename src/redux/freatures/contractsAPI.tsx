/** @format */

import baseApi from "../api/baseAPI";
import { ContractsAPIResponse, AmendContractRequest } from "@/types/AllTypes";

const contractsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query<ContractsAPIResponse, void>({
      query: () => "/api/jobs/company-engagements/",
      providesTags: ["Contract"],
    }),
    amendContract: builder.mutation<
      void,
      { id: number; data: AmendContractRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contract"],
    }),
  }),
});

export const { useGetContractsQuery, useAmendContractMutation } = contractsAPI;
