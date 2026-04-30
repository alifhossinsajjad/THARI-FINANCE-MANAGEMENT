// Redux/features/userDashboardServices/communication/communicationApi.ts

import { baseApi } from "@/Redux/api/baseApi";

export interface ChatMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sender: {
    id: number;
    name: string;
  };
  receiver: {
    id: number;
    name: string;
  };
}

interface ApiResponse<T> {
  status: boolean;
  data: T;
}

export const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get conversation with proper typing
    getConversation: builder.query<ChatMessage[], number>({
      query: (userId) => {
        return {
          url: `/chat/${userId}`, // This is correct for getting messages
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<ChatMessage[]>) => {
        // Handle the nested data structure from your API
        if (response?.status === true && response?.data) {
          return response.data;
        }
        // Fallback if response is already an array
        if (Array.isArray(response)) {
          return response;
        }

        return [];
      },
      transformErrorResponse: (error) => {
        return error;
      },
      providesTags: ["Chat"],
    }),

    // Send message - FIXED URL
    sendMessage: builder.mutation<
      ApiResponse<ChatMessage>,
      { sender_id: number; receiver_id: number; message: string }
    >({
      query: (body) => {
        return {
          url: `/chat/send`,
          method: "POST",
          body,
        };
      },
      transformResponse: (response: ApiResponse<ChatMessage>) => {
        return response;
      },
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useGetConversationQuery, useSendMessageMutation } =
  communicationApi;
