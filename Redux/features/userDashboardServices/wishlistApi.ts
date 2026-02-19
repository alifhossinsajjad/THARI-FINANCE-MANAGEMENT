import { baseApi } from "@/Redux/api/baseApi";

export interface IWishlistItem {
    id: number;
    user_id: number;
    stock_symbol: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface IWishlistResponse {
    success: boolean;
    message?: string;
    data: IWishlistItem;
}

export interface IGetWishlistResponse {
    success: boolean;
    data: IWishlistItem[];
}

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query<IGetWishlistResponse, void>({
            query: () => ({
                url: "/wishlist",
                method: "GET",
            }),
            providesTags: ["Wishlist"],
        }),
        addToWishlist: builder.mutation<IWishlistResponse, string>({
            query: (symbol) => ({
                url: "/wishlist",
                method: "POST",
                body: { stock_symbol: symbol },
            }),
            invalidatesTags: ["Wishlist"],
        }),
        removeFromWishlist: builder.mutation<{ success: boolean; message: string }, number>({
            query: (id) => ({
                url: `/wishlist/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} = wishlistApi;
