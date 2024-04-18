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
  }),
});

export const {
    useCreateRequestSoldItemMutation,
} = requestSoldItemApiSlice;