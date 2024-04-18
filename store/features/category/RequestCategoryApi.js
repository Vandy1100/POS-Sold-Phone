import { apiSlice } from "../../api/apiSlice";

export const requestCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestCategories: builder.query({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
      providesTags: ["requestCategory"],
    }),
    getRequestCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["requestCategory"],
    }),
    createRequestCategory: builder.mutation({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["requestCategory"],
    }),
    updateRequestCategory: builder.mutation({
      query: ({ id,category }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["requestCategory"],
    }),
    deleteRequestCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestCategory"],
    }),
  }),
});

export const {
   useGetRequestCategoriesQuery,
    useCreateRequestCategoryMutation,
  useGetRequestCategoryByIdQuery,
  useUpdateRequestCategoryMutation,
  useDeleteRequestCategoryMutation,
} = requestCategoryApiSlice;