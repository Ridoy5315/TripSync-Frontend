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
    
  }),
});

export const {
     useGetOwnInfoQuery,
     useEditProfileMutation
} = userApi;
