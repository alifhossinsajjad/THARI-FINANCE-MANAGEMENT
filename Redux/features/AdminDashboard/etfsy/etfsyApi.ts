/* ================= Types ================= */

import { baseApi } from "@/Redux/api/baseApi";

export type StockRatingStatus =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | "UNRATED"
  | "UNKNOWN";

export type StockRatingItem = {
  symbol: string;
  name: string;
  exchange: string;
  status: StockRatingStatus;
};

export type CompliantStockItem = {
  symbol: string;
  reportDate: string;
  name: string;
  exchange: string;
};

export type EtfReportItem = {
  symbol: string;
  name: string;
  status: StockRatingStatus;
  reportDate: string;
  holdingsAsOfDate: string;
};

export type PaginatedItems<T> = {
  items: T[];
  nextToken: string | null;
};

/* ===== Responses ===== */

export type ReportsResponse = {
  data: {
    basicCompliance: {
      reports: PaginatedItems<StockRatingItem>;
    };
  };
};

export type CompliantStocksResponse = {
  data: {
    basicCompliance: {
      reports: PaginatedItems<CompliantStockItem>;
    };
  };
};

export type EtfReportsResponse = {
  data: {
    basicCompliance: {
      funds: PaginatedItems<EtfReportItem>;
    };
  };
};

export type SingleStockResponse = {
  data: {
    basicCompliance: {
      report: StockRatingItem;
    };
  };
};

/* ===== Queries ===== */

export type ReportsQuery = {
  nextToken?: string;
};

export type CompliantStocksQuery = {
  status: "COMPLIANT" | "NON_COMPLIANT" | "UNRATED";
  nextToken?: string;
};

export type EtfReportsQuery = {
  nextToken?: string;
};

export type SingleStockQuery = {
  symbol: string;
};

/* ================= API ================= */

export const etfsyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1) GET: /zoya/reports (US market ratings)
    getUsMarketRatings: builder.query<ReportsResponse, ReportsQuery | void>({
      query: (params) => ({
        url: "/zoya/reports",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.basicCompliance?.reports?.items?.length
          ? [
              { type: "Zoya" as const, id: "US_RATINGS" },
              ...result.data.basicCompliance.reports.items.map((i) => ({
                type: "Zoya" as const,
                id: `STOCK_${i.symbol}`,
              })),
            ]
          : [{ type: "Zoya" as const, id: "US_RATINGS" }],
    }),

    // 2) GET: /zoya/compliant-stocks
    getCompliantStocks: builder.query<
      CompliantStocksResponse,
      CompliantStocksQuery
    >({
      query: (params) => ({
        url: "/zoya/compliant-stocks",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.data?.basicCompliance?.reports?.items?.length
          ? [
              { type: "Zoya" as const, id: "COMPLIANT_STOCKS" },
              ...result.data.basicCompliance.reports.items.map((i) => ({
                type: "Zoya" as const,
                id: `STOCK_${i.symbol}`,
              })),
            ]
          : [{ type: "Zoya" as const, id: "COMPLIANT_STOCKS" }],
    }),

    // 3) GET: /zoya/etf-reports
    getEtfReports: builder.query<EtfReportsResponse, EtfReportsQuery | void>({
      query: (params) => ({
        url: "/zoya/etf-reports",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.basicCompliance?.funds?.items?.length
          ? [
              { type: "Zoya" as const, id: "ETF_REPORTS" },
              ...result.data.basicCompliance.funds.items.map((i) => ({
                type: "Zoya" as const,
                id: `ETF_${i.symbol}`,
              })),
            ]
          : [{ type: "Zoya" as const, id: "ETF_REPORTS" }],
    }),

    // 4) GET: /zoya/stock?symbol=AMD
    getStockBySymbol: builder.query<SingleStockResponse, SingleStockQuery>({
      query: ({ symbol }) => ({
        url: "/zoya/stock",
        method: "GET",
        params: { symbol },
      }),
      providesTags: (_res, _err, { symbol }) => [
        { type: "Zoya" as const, id: `STOCK_${symbol}` },
      ],
    }),
  }),

  overrideExisting: false,
});

/* ================= Hooks ================= */

export const {
  useGetUsMarketRatingsQuery,
  useGetCompliantStocksQuery,
  useGetEtfReportsQuery,
  useGetStockBySymbolQuery,
} = etfsyApi;
