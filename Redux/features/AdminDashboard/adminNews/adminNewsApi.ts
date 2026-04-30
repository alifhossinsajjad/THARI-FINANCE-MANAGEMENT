import { baseApi } from "@/Redux/api/baseApi";

const adminNewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new job
    createNews: builder.mutation({
      query: (formData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateNewsMutation } = adminNewsApi;
