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

export const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Get conversation
    getConversation: builder.query<ChatMessage[], number>({
      query: (userId) => ({
        url: `/chat/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: ChatMessage[] }) =>
        response.data,
      providesTags: ["Chat"],
    }),

    // ✅ Send message
    sendMessage: builder.mutation<
      ChatMessage,
      { sender_id: number; receiver_id: number; message: string }
    >({
      query: (body) => ({
        url: "/chat/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),

  }),
});

export const {
  useGetConversationQuery,
  useSendMessageMutation,
} = communicationApi;
