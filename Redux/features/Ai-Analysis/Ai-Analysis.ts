import { baseApi } from "@/Redux/api/baseApi";

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
    current_price: number;
    percent_change: number;
    chart_30d: {
      timestamp_utc: string;
      close: number;
    }[];
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




export const AiAnalysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔹 POST: Company Analysis
    analyzeCompany: builder.mutation<AnalysisResponse, AnalysisRequest>({
      query: (body) => ({
        url: "/api/v1/analysis/company",
        method: "POST",
        body,
      }),
    }),

    // 🔹 GET: History
    getHistory: builder.query<HistoryItem[], string>({
      query: (userId) => `/api/v1/analysis/history/${userId}`,
    }),

    // 🔹 GET: Single Result
    getAnalysisResult: builder.query<AnalysisResponse, string>({
      query: (id) => `/api/v1/analysis/result/${id}`,
    }),

  }),
});


export const {
  useAnalyzeCompanyMutation,
  useGetHistoryQuery,
  useLazyGetAnalysisResultQuery,
} = AiAnalysisApi;