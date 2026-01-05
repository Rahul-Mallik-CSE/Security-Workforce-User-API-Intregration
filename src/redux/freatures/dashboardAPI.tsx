/** @format */

import baseApi from "../api/baseAPI";
import { DashboardAPIResponse } from "@/types/AllTypes";

const dashboardAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardAPIResponse, void>({
      query: () => "/api/jobs/company-dashboard-metrics/",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = dashboardAPI;

export default dashboardAPI;
