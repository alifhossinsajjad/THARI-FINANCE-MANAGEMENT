import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi", // or just "api" if you prefer
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Pricing", "Subscription","Contact"],
});
