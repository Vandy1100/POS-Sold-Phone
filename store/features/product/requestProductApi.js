import { apiSlice } from "../../api/apiSlice";

export const requestProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestProducts: builder.query({
      query: () => `/products`,
      keepUnusedDataFor: 5,
      providesTags: ["requestProduct"],
    }),
    getRequestProductStocks: builder.query({
      query: () => `/products/product_stock`,
      keepUnusedDataFor: 5,
      providesTags: ["requestProduct"],
    }),
    getRequestProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["requestProduct"],
    }),
    createRequestProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["requestProduct"],
    }),
    createRequestAddStockProduct: builder.mutation({
      query: (product) => ({
        url: "/products/add-stock",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["requestProduct"],
    }),
    updateRequestProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["requestProduct"],
    }),
    updateRequestDiscount: builder.mutation({
      query: ({ id, discount }) => ({
        url: `products/discount/${id}`,
        method: "PUT",
        body: discount , 
      }),
      invalidatesTags: ["requestProduct"],
    }),    
    deleteRequestProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestProduct"],
    }),

    // getRequestSubjectClientByRoute: builder.query({
    //   query: (route) => `/subjects/client/${route}`,
    //   providesTags: ["requestSubjects"],
    // }),
    //   invalidatesTags: ["requestSubjects"],
    // }),
  }),
});

export const {
  useUpdateRequestProductMutation,
  useGetRequestProductsQuery,
  useGetRequestProductStocksQuery,
  useGetRequestProductByIdQuery,
  useDeleteRequestProductMutation,
  useUpdateRequestDiscountMutation,
  //   useGetRequestSubjectClientByRouteQuery,
  useCreateRequestProductMutation,
  useCreateRequestAddStockProductMutation,
} = requestProductApiSlice;
