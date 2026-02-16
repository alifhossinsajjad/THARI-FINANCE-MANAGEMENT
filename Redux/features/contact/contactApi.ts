import { baseApi } from "@/Redux/api/baseApi";
import {ContactFormData, ContactResponse} from "@/types/contactTypes"

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContact: builder.mutation<ContactResponse, ContactFormData>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
      }),
    }),
  }),
});

export const { useSendContactMutation } = contactApi;
