import { globalClusterApi } from "../api/apiSlice";

/**
 * AuthApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const AuthApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/api/v1/register/individual/",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/login/",
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