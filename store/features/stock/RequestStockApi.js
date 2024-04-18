import { apiSlice } from "../../api/apiSlice";

export const requestCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestStocks: builder.query({
      query: () => `/stocks`,
      keepUnusedDataFor: 5,
      providesTags: ["requestStock"],
    }),
    deleteRequestStock: builder.mutation({
      query: (id) => ({
        url: `/stocks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestStock"],
    }),
  }),
});

export const {
   useGetRequestStocksQuery,
//     useCreateRequestCategoryMutation,
//   useGetRequestCategoryByIdQuery,
//   useUpdateRequestCategoryMutation,
  useDeleteRequestStockMutation,
} = requestCategoryApiSlice;