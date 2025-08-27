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
    rideDetails: builder.query({
      query: () => ({
        url: `/ride/ride-details`,
        method: "GET",
      }),
      providesTags: ["RIDE"]
    }),
  }),
});

export const {
     useRideRequestMutation,
     useRideDetailsQuery
} = rideApi;
