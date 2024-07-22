import { globalClusterApi } from "../api/apiSlice";

export const AuthApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `auth/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "auth/forgot",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
  }),
});

export const { useSignupMutation,useLoginMutation,useResetPasswordMutation,useForgotPasswordMutation }  = AuthApiSlice