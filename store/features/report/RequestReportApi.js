import { apiSlice } from "../../api/apiSlice";

export const requestReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestReportsChart: builder.query({
      query: () => `/reports/chart-7days`,
      keepUnusedDataFor: 5,
      providesTags: ["requestReport"],
    }),
    getRequestReportsPieChart: builder.query({
        query: () => `/reports/pie-7days`,
        keepUnusedDataFor: 5,
        providesTags: ["requestReport"],
      }),
      getRequestReportsDaily: builder.query({
        query: () => `/reports/daily`,
        keepUnusedDataFor: 5,
        providesTags: ["requestReport"],
      }),
      getRequestReportsTotalSold: builder.query({
        query: () => `/reports/total`,
        keepUnusedDataFor: 5,
        providesTags: ["requestReports"],
      }),
      getRequestReportsCustomer: builder.query({
        query: () => `/reports/count-customer`,
        keepUnusedDataFor: 5,
        providesTags: ["requestReport"],
      }),
  }),
});

export const {
   useGetRequestReportsChartQuery,
   useGetRequestReportsPieChartQuery,
   useGetRequestReportsDailyQuery,
   useGetRequestReportsTotalSoldQuery,
   useGetRequestReportsCustomerQuery
} = requestReportApiSlice;