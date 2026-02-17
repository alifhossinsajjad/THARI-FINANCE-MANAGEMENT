import { baseApi } from "@/Redux/api/baseApi";

export interface IAdvancedComplianceReport {
    symbol: string;
    rawSymbol: string;
    name: string;
    figi: string;
    exchange: string;
    status: string;
    reportDate: string;
    businessScreen: string;
    financialScreen: string;
    debtToMarketCapRatio: number;
    securitiesToMarketCapRatio: number;
}

export interface INonUsStockResponse {
    data: {
        advancedCompliance: {
            report: IAdvancedComplianceReport;
        };
    };
}

export interface ISearchNonUsStockParams {
    symbol: string;
    methodology?: string;
}

const nonUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchNonUsStock: builder.query<INonUsStockResponse, ISearchNonUsStockParams>({
            query: ({ symbol, methodology = "AAOIFI" }) => ({
                url: `/zoya/international-report?symbol=${symbol.toUpperCase()}&methodology=${methodology}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useSearchNonUsStockQuery } = nonUsApi;
