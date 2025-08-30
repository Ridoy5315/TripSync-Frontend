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
    getActiveRideStatus: builder.query({
      query: () => ({
        url: `/driver/activeRideStatus`,
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
    pickedUpStatus: builder.mutation({
      query: (rideId) => ({
        url: `/driver/pickedUp/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    inTransitStatus: builder.mutation({
      query: (rideId) => ({
        url: `/driver/inTransit/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    completedStatus: builder.mutation({
      query: (rideId) => ({
        url: `/driver/completed/${rideId}`,
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
     useRejectRideMutation,
     useGetActiveRideStatusQuery,
     usePickedUpStatusMutation,
     useInTransitStatusMutation,
     useCompletedStatusMutation,
} = driverApi;
