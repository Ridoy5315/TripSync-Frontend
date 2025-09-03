import { baseApi } from "@/redux/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
//     availabilityStatusChange : builder.mutation<void, void>({
//       query: () => ({
//         url: "driver/availabilityStatus",
//         method: "POST",
//       }),
//       invalidatesTags: ["DRIVER"]
//     }),
//     completedStatus: builder.mutation({
//       query: (rideId) => ({
//         url: `/driver/completed/${rideId}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["DRIVER"],
//     }),
    getRider: builder.query({
      query: ({params}) => ({
        url: "/stats/rider",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response?.data?.totalRider,
    }),
    getDriver: builder.query<any, { params?: any }>({
      query: ({ params } = {}) => ({
        url: "/stats/driver",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response: { data: any }) => response?.data,
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
     useGetDriverQuery,
     useGetAllRidesQuery,
     useGetRidesVolumeQuery,
     useGetRevenueQuery,
     useGetAdminsQuery
} = adminApi;
