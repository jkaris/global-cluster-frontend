import { globalClusterApi } from "../api/apiSlice";

/**
 * BusinessApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const BusinessApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signupBusiness: builder.mutation({
      query: (signupData) => ({
        url: "/api/v1/register/company/",
        method: "POST",
        body: signupData,
      }),
    }),
    loginBusiness: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/login/",
        method: "POST",
        body: loginData,
      }),
    }),
    resetPasswordBusiness: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/register/company/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    forgotPasswordBusiness: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/register/company/forgot",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
  }),
});

export const { useSignupBusinessMutation,useLoginBusinessMutation,useResetPasswordBusinessMutation,useForgotPasswordBusinessMutation }  = BusinessApiSlice