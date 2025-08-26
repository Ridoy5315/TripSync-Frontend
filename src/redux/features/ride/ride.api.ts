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
  }),
});

export const {
     useRideRequestMutation
} = rideApi;
