// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    createRequestUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["requestUser"],
    }),
    getRequestUsers: builder.query({
      query: () => `/auth/users`,
      keepUnusedDataFor: 5,
      providesTags: ["requestUser"],
    }),
    deleteRequestUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestUser"],
    }),
  }),
});
// auto generated hooks for login mutation
export const {
  useLoginMutation,
  useCreateRequestUserMutation,
  useDeleteRequestUserMutation,
  useGetRequestUsersQuery,
} = authApiSlice;
