import { baseApi } from "@/Redux/api/baseApi";

const userMetaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShowAllTotalActiveUserMetaData: builder.query({
      query: () => ({
        url: "/admin/dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShowAllTotalActiveUserMetaDataQuery } = userMetaDataApi;
