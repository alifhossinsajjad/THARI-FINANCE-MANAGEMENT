import { baseApi } from "@/Redux/api/baseApi";

const adminProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get profile data by id
    getAdminProfileInfo: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    // Create new job
    updateAdminProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PUT",
        body: formData,
      }),
    }),
    // updated the password
    updateAdminPassword: builder.mutation({
      query: (data: any) => ({
        url: "/profile/password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdminProfileInfoQuery,
  useUpdateAdminProfileMutation,
  useUpdateAdminPasswordMutation,
} = adminProfileApi;
