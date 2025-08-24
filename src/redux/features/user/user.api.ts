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
    
  }),
});

export const {
     useGetOwnInfoQuery,
} = userApi;
