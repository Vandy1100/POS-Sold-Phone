import { apiSlice } from "../../api/apiSlice";

export const requestSoldItemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRequestSoldItem: builder.mutation({
      query: (soldItem) => ({
        url: "/sale_items",
        method: "POST",
        body: soldItem,
      }),
      invalidatesTags: ["requestSoldItem"],
    }),
    getRequestSaleItems: builder.query({
      query: () => `/sale_items`,
      keepUnusedDataFor: 5,
      providesTags: ["requestSoldItem"],
    }),
  }),
});

export const {
    useCreateRequestSoldItemMutation,
    useGetRequestSaleItemsQuery,
} = requestSoldItemApiSlice;