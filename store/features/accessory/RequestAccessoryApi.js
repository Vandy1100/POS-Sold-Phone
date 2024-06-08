import { apiSlice } from "../../api/apiSlice";

export const requestAccessoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestAccessories: builder.query({
      query: () => `/accessories`,
      keepUnusedDataFor: 5,
      providesTags: ["requestAccessory"],
    }),
    getRequestAccessoriesById: builder.query({
      query: (id) => `/accessories/lists/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["requestAccessory"],
    }),
    getRequestAccessoryById: builder.query({
      query: (id) => `/accessories/${id}`,
      providesTags: ["requestAccessory"],
    }),
    createRequestAccessory: builder.mutation({
      query: (category) => ({
        url: "/accessories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["requestAccessory"],
    }),
    updateRequestAccessory: builder.mutation({
      query: ({ id,category }) => ({
        url: `/accessories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["requestAccessory"],
    }),
    deleteRequestAccessory: builder.mutation({
      query: (id) => ({
        url: `/accessories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestAccessory"],
    }),
  }),
});

export const {
   useGetRequestAccessoriesQuery,
   useGetRequestAccessoriesByIdQuery,
    useCreateRequestAccessoryMutation,
  useGetRequestAccessoryByIdQuery,
  useUpdateRequestAccessoryMutation,
  useDeleteRequestAccessoryMutation,
} = requestAccessoryApiSlice;