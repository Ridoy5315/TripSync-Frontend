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
    getDriver: builder.query({
      query: ({params}) => ({
        url: "/stats/driver",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response?.data?.totalDriver,
    }),

  }),
});

export const {
     useGetRiderQuery,
     useGetDriverQuery
} = adminApi;
