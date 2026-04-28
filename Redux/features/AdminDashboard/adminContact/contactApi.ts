import { baseApi } from "@/Redux/api/baseApi";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface ContactApiResponse {
  data: Contact[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactMessage: builder.query<ContactApiResponse, number>({
      query: (page = 1) => `/contact?page=${page}`,
      providesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactMessageQuery } = contactApi;
