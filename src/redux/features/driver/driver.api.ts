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
//     rideDetails: builder.query({
//       query: () => ({
//         url: `/ride/ride-details`,
//         method: "GET",
//       }),
//       providesTags: ["RIDE"]
//     }),

  }),
});

export const {
     useAvailabilityStatusChangeMutation
} = driverApi;
