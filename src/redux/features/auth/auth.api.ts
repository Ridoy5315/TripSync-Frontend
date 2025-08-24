import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    signIn: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});


export const {useSignUpMutation, useSignInMutation} = authApi
