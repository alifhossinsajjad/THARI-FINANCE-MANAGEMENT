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
    }),
    // admin gel all message
    getAdminAllMessage: builder.query({
      query: () => ({
        url: `/chat`,
        method: "GET",
      }),
    }),
    getSingleAllMessage: builder.query({
      query: (id) => ({
        url: `/chat/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAdminReplayMessageMutation,
  useGetAdminAllMessageQuery,
  useGetSingleAllMessageQuery,
} = adminCommunicationsApi;
