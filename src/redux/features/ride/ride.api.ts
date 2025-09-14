import { baseApi } from "@/redux/baseApi";

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rideRequest: builder.mutation({
      query: ({userId, data}) => ({
        url: `ride/request/${userId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["RIDE"]
    }),
    getAllRidesStats: builder.query({
      query: () => ({
        url: `/ride/all-rides-stats`,
        method: "GET",
      }),
    }),
    rideDetails: builder.query({
      query: () => ({
        url: `/ride/ride-details`,
        method: "GET",
      }),
      providesTags: ["RIDE"]
    }),
    rideHistory: builder.query({
      query: ({userId, params}) => ({
        url: `/ride/rideHistory/${userId}`,
        method: "GET",
        params,
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response.data,
    }),
    riderFeedback: builder.mutation({
      query: ({rideId, payload}) => ({
        url: `/ride/feedback/${rideId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["RIDE"],
    })
  }),
});

export const {
     useRideRequestMutation,
     useGetAllRidesStatsQuery,
     useRideDetailsQuery,
     useRideHistoryQuery,
     useRiderFeedbackMutation
} = rideApi;
