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
    // get message notification
    getAllMessageNotification: builder.query({
      query: () => ({
        url: `/admin/message-notifications`,
        method: "GET",
      }),
    }),
    // Create new job
    markNotificationRead: builder.mutation({
      query: (id: number) => ({
        url: `/admin/message-notifications/read/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAdminReplayMessageMutation,
  useGetAdminAllMessageQuery,
  useGetSingleAllMessageQuery,
  useGetAllMessageNotificationQuery,
  useMarkNotificationReadMutation,
} = adminCommunicationsApi;
