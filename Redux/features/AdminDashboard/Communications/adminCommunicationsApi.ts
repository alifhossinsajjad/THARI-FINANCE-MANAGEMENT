import { baseApi } from "@/Redux/api/baseApi";

const adminCommunicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new job
    adminReplayMessage: builder.mutation({
      query: (body) => ({
        url: "/chat/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),
    // admin gel all message
    getAdminAllMessage: builder.query({
      query: () => ({
        url: `/chat`,
        method: "GET",
      }),
      transformResponse: (response: any) =>
        Array.isArray(response) ? response : response?.data || [],
      providesTags: ["Chat"],
    }),
    getSingleAllMessage: builder.query({
      query: (id) => ({
        url: `/chat/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) =>
        Array.isArray(response) ? response : response?.data || [],
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useAdminReplayMessageMutation,
  useGetAdminAllMessageQuery,
  useGetSingleAllMessageQuery,
} = adminCommunicationsApi;
