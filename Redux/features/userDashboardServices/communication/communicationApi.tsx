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
        console.log("Fetching messages for user ID:", userId);
        return {
          url: `/chat/${userId}`, // This is correct for getting messages
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<ChatMessage[]>) => {
        console.log("Raw API Response in getConversation:", response);
        
        // Handle the nested data structure from your API
        if (response?.status === true && response?.data) {
          console.log("Extracted data:", response.data);
          return response.data;
        }
        // Fallback if response is already an array
        if (Array.isArray(response)) {
          console.log("Response is array:", response);
          return response;
        }
        console.log("No data found, returning empty array");
        return [];
      },
      transformErrorResponse: (error) => {
        console.log("Error response:", error);
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
        console.log("Sending message with body:", body);
        return {
          url: `/chat/send`, // FIXED: This should be /chat/send, not /chat/${body.sender_id}
          method: "POST",
          body,
        };
      },
      transformResponse: (response: ApiResponse<ChatMessage>) => {
        console.log("Send message response:", response);
        return response;
      },
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useGetConversationQuery, useSendMessageMutation } = communicationApi;