import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOwnInfo: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
      providesTags: ["USER"]
    }),
    editProfile: builder.mutation({
      query: ({userId, profileData}) => ({
        url: `user/update/${userId}`,
        method: "PATCH",
        data: profileData,
      }),
      invalidatesTags: ["USER"]
    }),
    createEmergencyContact: builder.mutation({
      query: ({userId, addEmergencyContact}) => ({
        url: `user/create-emergency-contact/${userId}`,
        method: "PATCH",
        data: addEmergencyContact,
      }),
      invalidatesTags: ["USER"],
    }),
    sendGPSLink: builder.mutation({
      query: ({gpsLink}) => ({
        url: `user/send-gps-link`,
        method: "POST",
        data: {gpsLink},
      }),
      invalidatesTags: ["USER", "DRIVER"]
    }),
  }),
});

export const {
     useGetOwnInfoQuery,
     useEditProfileMutation,
     useCreateEmergencyContactMutation,
     useSendGPSLinkMutation
} = userApi;
