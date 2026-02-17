import { baseApi } from "@/Redux/api/baseApi";

export interface IEtfReportItem {
    symbol: string;
    name: string;
    status: string;
    reportDate: string;
    holdingsAsOfDate: string;
}

export interface IEtfApiResponse {
    data: {
        basicCompliance: {
            funds: {
                items: IEtfReportItem[];
                nextToken: string | null;
            };
        };
    };
}

export interface IGetEtfReportsParams {
    limit?: number;
    nextToken?: string | null;
}

const etfApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEtfReports: builder.query<
            { items: IEtfReportItem[]; nextToken: string | null },
            IGetEtfReportsParams | void
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
                    url: `/zoya/etf-reports${queryString}`,
                    method: "GET",
                };
            },
            transformResponse: (response: IEtfApiResponse) => {
                const funds = response.data.basicCompliance.funds;
                return {
                    items: funds.items,
                    nextToken: funds.nextToken,
                };
            },
        }),
    }),
});

export const { useGetEtfReportsQuery } = etfApi;
