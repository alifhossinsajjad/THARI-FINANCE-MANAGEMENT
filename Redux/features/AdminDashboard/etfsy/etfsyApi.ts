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

export const { useGetStockBySymbolQuery } = etfsyApi;
