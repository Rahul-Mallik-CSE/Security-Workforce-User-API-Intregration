/** @format */

import baseApi from "../api/baseAPI";
import { PayrollAPIResponse } from "@/types/AllTypes";

const payrollAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayrolls: builder.query<PayrollAPIResponse, void>({
      query: () => "/api/jobs/comanny-payroll-management-views/",
      providesTags: ["Payroll"],
    }),
    markAsPaid: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "PUT",
        body: { paid_a_gaurd: true },
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const { useGetPayrollsQuery, useMarkAsPaidMutation } = payrollAPI;
