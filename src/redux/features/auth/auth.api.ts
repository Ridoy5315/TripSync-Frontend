import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
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
    signOut: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"]
    }),
    changePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "auth/change-password",
        method: "POST",
        data: passwordInfo
      }),
      invalidatesTags: ["USER"]
    }),
    sendOtp: builder.mutation({
      query: (userInfo) => ({
        url: "otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userInfo) => ({
        url: "otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useChangePasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
