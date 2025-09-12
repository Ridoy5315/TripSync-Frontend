import { baseApi } from "@/redux/baseApi";
import type { IGetDriverParams, IGetDriverResponse } from "@/types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRider: builder.query({
      query: ({params}) => ({
        url: "/stats/rider",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response?.data?.totalRider,
    }),
    getPendingDrivers: builder.query({
      query: () => ({
        url: "/driver/pendingDrivers",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      // transformResponse: (response: { data: any }) => response?.data,
    }),
    acceptOrRejectDriver: builder.mutation({
      query: ({value,userId}) => ({
        url: `driver/${userId}`,
        method: "PATCH",
        data: { data: JSON.stringify({ status: value }) }
      }),
      invalidatesTags: ["ADMIN"]
    }),
    getDriver: builder.query<IGetDriverResponse, { params?: IGetDriverParams }>({
      query: ({ params } = {}) => ({
        url: "/stats/driver",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response: { data: IGetDriverResponse }) => response?.data,
    }),
    getAllRides: builder.query({
      query: ({params}) => ({
        url: "/ride/all-rides",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      // transformResponse: (response) => response?.data?.totalDriver,
    }),
    getRidesVolume: builder.query({
      query: () => ({
        url: "/stats/rides",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      // transformResponse: (response) => response?.data?.totalDriver,
    }),
    getRevenue: builder.query({
      query: () => ({
        url: "/stats/payment",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      // transformResponse: (response) => response?.data?.totalDriver,
    }),
    getAdmins: builder.query({
      query: ({params}) => ({
        url: "/stats/admin",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      // transformResponse: (response) => response?.data?.totalDriver,
    }),

  }),
});

export const {
     useGetRiderQuery,
     useGetPendingDriversQuery,
     useAcceptOrRejectDriverMutation,
     useGetDriverQuery,
     useGetAllRidesQuery,
     useGetRidesVolumeQuery,
     useGetRevenueQuery,
     useGetAdminsQuery
} = adminApi;
