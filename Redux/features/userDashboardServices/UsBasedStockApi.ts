
import { baseApi } from "@/Redux/api/baseApi";


// Individual stock item
export interface IStockReportItem {
    symbol: string;
    name: string;
    exchange: string;
    status: "COMPLIANT" | "NON_COMPLIANT";
}

// Reports wrapper
export interface IStockReports {
    items: IStockReportItem[];
    nextToken: string | null;
}

// Basic compliance wrapper
export interface IBasicCompliance {
    reports: IStockReports;
}

// Main response structure
export interface IUsBasedStockResponse {
    data: {
        basicCompliance: IBasicCompliance;
    };
}

// Single stock search response (note: singular "report" not "reports")
export interface IStockSearchResponse {
    data: {
        basicCompliance: {
            report: IStockReportItem;
        };
    };
}

// Pagination parameters
export interface IGetUsBasedStockReportsParams {
    limit?: number;
    nextToken?: string | null;
}

const usBasedStockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsBasedStockReports: builder.query<IUsBasedStockResponse, IGetUsBasedStockReportsParams | void>({
            query: (params) => {
                let queryString = "";
                if (params) {
                    const queryParams = new URLSearchParams();
                    if ('limit' in params && params.limit) queryParams.append("limit", params.limit.toString());
                    if ('nextToken' in params && params.nextToken) queryParams.append("nextToken", params.nextToken);
                    const stringifiedParams = queryParams.toString();
                    if (stringifiedParams) {
                        queryString = `?${stringifiedParams}`;
                    }
                }

                return {
                    url: `/zoya/reports${queryString}`,
                    method: "GET",
                };
            },
        }),
        searchStockBySymbol: builder.query<IStockSearchResponse, string>({
            query: (symbol) => ({
                url: `/zoya/stock?symbol=${symbol.toUpperCase()}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUsBasedStockReportsQuery, useSearchStockBySymbolQuery } = usBasedStockApi;