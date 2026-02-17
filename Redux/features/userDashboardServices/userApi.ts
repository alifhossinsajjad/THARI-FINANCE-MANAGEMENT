import { baseApi } from "@/Redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get logged-in user's profile
    getMyProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update logged-in user's profile
    updateMyProfile: builder.mutation({
      query: (body) => ({
        url: "/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Change password
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/profile/password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangePasswordMutation,
} = userApi;
