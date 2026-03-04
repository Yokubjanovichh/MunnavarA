import { baseApi } from "./baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSalesAnalytics: build.query({
      query: ({ from, to, granularity } = {}) => ({
        url: "/analytics/sales",
        params: { from, to, granularity },
      }),
      providesTags: ["Analytics"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSalesAnalyticsQuery } = analyticsApi;

