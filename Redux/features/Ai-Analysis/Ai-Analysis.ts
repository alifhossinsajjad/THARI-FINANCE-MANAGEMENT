import { baseApi } from "@/Redux/api/baseApi";
import { RootState } from "@/Redux/store";
import { fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export interface AnalysisRequest {
  user_id: string;
  company_name: string;
  language: string;
}

export interface TableRow {
  [key: string]: string; // dynamic key (Metric, Trend etc.)
}

export interface Table {
  columns: string[];
  rows: TableRow[];
}


export interface AnalysisResponse {
  company_name: string;
  ticker: string;
  shariah_status: string;

  stock_snapshot: {
    symbol?: string;
    exchange?: string;
    currency?: string;
    current_price?: number;
    previous_close?: number;
    absolute_change?: number;
    percent_change?: number;
    open?: number | null;
    day_low?: number;
    day_high?: number;
    year_low?: number;
    year_high?: number;
    volume?: number;
    market_cap?: number | null;
    eps_ttm?: number | null;
    pe_ratio?: number | null;
    chart_30d: {
      timestamp_utc: string;
      close: number;
    }[];
    last_updated_utc?: string;
  };

  sections: {
    title: string;
    content: string;
    tables: Table[]; 
  }[];
}

export interface HistoryItem {
  id: string;
  company_name: string;
  ticker: string | null;
  language: string;
  shariah_status: string;
  searched_at: string;
}




const aiBaseQuery = fetchBaseQuery({
  baseUrl: "/api/ai_proxy",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const AiAnalysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔹 POST: Company Analysis
    analyzeCompany: builder.mutation<AnalysisResponse, AnalysisRequest>({
      queryFn: async (arg, api, extraOptions) => {
        const result = await aiBaseQuery({ url: "/analysis/company", method: "POST", body: arg }, api, extraOptions);
        return result.error ? { error: result.error as any } : { data: result.data as AnalysisResponse };
      },
    }),

    // 🔹 GET: History
    getHistory: builder.query<HistoryItem[], string>({
      queryFn: async (userId, api, extraOptions) => {
        const result = await aiBaseQuery({ url: `/analysis/history/${userId}` }, api, extraOptions);
        return result.error ? { error: result.error as any } : { data: result.data as HistoryItem[] };
      },
    }),

    // 🔹 GET: Single Result
    getAnalysisResult: builder.query<AnalysisResponse, string>({
      queryFn: async (id, api, extraOptions) => {
        const result = await aiBaseQuery({ url: `/analysis/result/${id}` }, api, extraOptions);
        return result.error ? { error: result.error as any } : { data: result.data as AnalysisResponse };
      },
    }),

  }),
});


export const {
  useAnalyzeCompanyMutation,
  useGetHistoryQuery,
  useLazyGetAnalysisResultQuery,
} = AiAnalysisApi;