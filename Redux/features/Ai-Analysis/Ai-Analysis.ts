// AI Analysis Feature types and API


export interface AnalysisRequest {
  user_id: string;
  company_name: string;
  language: string;
  plan_id:number;
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




import { AiBaseApi } from "@/Redux/api/AibaseApi";

export const AiAnalysisApi = AiBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 POST: Company Analysis
    analyzeCompany: builder.mutation<AnalysisResponse, AnalysisRequest>({
      query: (arg) => ({
        url: "/analysis/company",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["Analyses"],
    }),

    // 🔹 GET: History
    getHistory: builder.query<HistoryItem[], string>({
      query: (userId) => `/analysis/history/${userId}`,
      providesTags: ["Analyses"],
    }),

    // 🔹 GET: Single Result
    getAnalysisResult: builder.query<AnalysisResponse, string>({
      query: (id) => `/analysis/result/${id}`,
      providesTags: ["Analyses"],
    }),
  }),
});


export const {
  useAnalyzeCompanyMutation,
  useGetHistoryQuery,
  useLazyGetAnalysisResultQuery,
} = AiAnalysisApi;