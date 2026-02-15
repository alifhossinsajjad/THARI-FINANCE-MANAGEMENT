import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpInfo) => ({
        url: "/verify-otp",
        method: "POST",
        body: otpInfo,
      }),
    }),
    resendOtp: builder.mutation({
      query: (emailInfo) => ({
        url: "/resend-otp",
        method: "POST",
        body: emailInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailInfo) => ({
        url: "/forgot-password",
        method: "POST",
        body: emailInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetInfo) => ({
        url: "/reset-password",
        method: "POST",
        body: resetInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
