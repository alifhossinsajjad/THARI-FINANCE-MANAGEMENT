import { baseApi } from "@/Redux/api/baseApi";

const adminAboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new job
    createAboutContent: builder.mutation({
      query: (formData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateAboutContentMutation } = adminAboutApi;
