/** @format */

import baseApi from "../api/baseAPI";
import {
  ContractsAPIResponse,
  AmendContractRequest,
  ContractDetailsAPIResponse,
  UpdatePayRateRequest,
} from "@/types/AllTypes";

const contractsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query<ContractsAPIResponse, void>({
      query: () => "/api/jobs/company-engagements/",
      providesTags: ["Contract"],
    }),
    getContractDetails: builder.query<ContractDetailsAPIResponse, number>({
      query: (id) => `/api/jobs/company-engagements-details/${id}/`,
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
    updatePayRate: builder.mutation<
      void,
      { id: number; data: UpdatePayRateRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contract"],
    }),
    uploadSignature: builder.mutation<
      void,
      { id: number; signature: FormData }
    >({
      query: ({ id, signature }) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "PUT",
        body: signature,
      }),
      invalidatesTags: ["Contract"],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useGetContractDetailsQuery,
  useAmendContractMutation,
  useUpdatePayRateMutation,
  useUploadSignatureMutation,
} = contractsAPI;
