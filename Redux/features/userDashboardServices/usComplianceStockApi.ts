import { baseApi } from "@/Redux/api/baseApi";

export interface ICompliantStockItem {
    symbol: string;
    reportDate: string;
    name: string;
    exchange: string;
}

export interface ICompliantStockApiResponse {
    data: {
        basicCompliance: {
            reports: {
                items: ICompliantStockItem[];
                nextToken: string | null;
            };
        };
    };
}

// Pagination parameters
export interface IGetCompliantStocksParams {
    limit?: number;
    nextToken?: string | null;
}

const compliantStockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCompliantStocks: builder.query<
            { items: ICompliantStockItem[]; nextToken: string | null },
            IGetCompliantStocksParams | void
        >({
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
                    url: `/zoya/compliant-stocks${queryString}`,
                    method: "GET",
                };
            },
            transformResponse: (response: ICompliantStockApiResponse) => {
                const reports = response.data.basicCompliance.reports;
                return {
                    items: reports.items,
                    nextToken: reports.nextToken,
                };
            },
        }),
    }),
});

export const { useGetCompliantStocksQuery } = compliantStockApi;