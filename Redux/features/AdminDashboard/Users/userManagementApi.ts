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

    toggleUserBySupperAdmin: builder.mutation({
      query: ({ id, block }) => ({
        url: `/admin/users/${id}/toggle-status`,
        method: "PATCH",
        body: { block },
      }),
    }),
  }),
});

export const { useGetAllUserByAdminQuery, useToggleUserBySupperAdminMutation } =
  userManagementApi;
