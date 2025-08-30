import { baseApi } from "@/redux/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    availabilityStatusChange : builder.mutation<void, void>({
      query: () => ({
        url: "driver/availabilityStatus",
        method: "POST",
      }),
      invalidatesTags: ["DRIVER"]
    }),
    getAvailabilityStatus: builder.query({
      query: () => ({
        url: `/driver/availabilityStatus`,
        method: "GET",
      }),
      providesTags: ["DRIVER"]
    }),
    getAllPendingRides: builder.query({
      query: (params) => ({
        url: `/driver/pendingRides`,
        method: "GET",
        params
      }),
      providesTags: ["DRIVER"],
      transformResponse: (response) => response.data,
    }),
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/driver/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/driver/reject/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),

  }),
});

export const {
     useAvailabilityStatusChangeMutation,
     useGetAvailabilityStatusQuery,
     useGetAllPendingRidesQuery,
     useAcceptRideMutation,
     useRejectRideMutation
} = driverApi;
