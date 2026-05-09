import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const AiBaseApi = createApi({
  reducerPath: "AiBaseApi", // or just "api" if you prefer
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AI_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      const stateToken = (getState() as RootState).auth?.accessToken;

      const storageToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      const token = stateToken || storageToken;

      if (token && typeof token === "string") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("ngrok-skip-browser-warning", "true");

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Pricing",
    "Subscription",
    "Contact",
    "Income",
    "Expense",
    "Loan",
    "Wealth",
    "Analyses",
    "Chat",
    "Manager",
    "Wishlist",
    "Zoya",
  ],
});
