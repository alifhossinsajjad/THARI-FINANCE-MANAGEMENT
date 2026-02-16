import { baseApi } from "@/Redux/api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserByAdmin: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetAllUserByAdminQuery } = userManagementApi;
