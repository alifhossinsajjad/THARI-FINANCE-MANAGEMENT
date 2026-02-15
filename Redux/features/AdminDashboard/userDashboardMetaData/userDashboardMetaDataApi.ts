import { baseApi } from "@/Redux/api/baseApi";

const userDashboardMetaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShowAllTotalActiveUserMetaData: builder.query({
      query: () => ({
        url: "/admin/dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShowAllTotalActiveUserMetaDataQuery } =
  userDashboardMetaDataApi;
