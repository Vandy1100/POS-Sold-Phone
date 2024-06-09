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
    getRequestProductToSales: builder.query({
      query: () => `/products/product_sales`,
      keepUnusedDataFor: 5,
      providesTags: ["requestProduct"],
    }),
    
    getRequestSaleItemById: builder.query({
      query: (id) => `/sale_items/${id}`,
      providesTags: ["requestProduct"],
    }),
    getRequestSaleItemsUnitById: builder.query({
      query: (id) => `/sale_items/unit/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["requestSoldItem"],
    }),
  }),
});

export const {
    useCreateRequestSoldItemMutation,
    useGetRequestProductToSalesQuery,
    useGetRequestSaleItemsQuery,
    useGetRequestSaleItemsUnitByIdQuery,
    useGetRequestSaleItemByIdQuery,
} = requestSoldItemApiSlice;