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
        url: "/api/v1/accounts/companies/",
        method: "POST",
        body: signupData,
      }),
    }),
    getBusiness: builder.mutation({
      query: (signupData) => ({
        url: "/api/v1/accounts/companies/",
        method: "GET",
      }),
    }),
    loginBusiness: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/accounts/token/",
        method: "POST",
        body: loginData,
      }),
    }),
    updateBusinessProfile: builder.mutation({
      query: (updateData ) => ({
        url: `/api/v1/accounts/companies/${updateData.id}`,
        method: "PUT",
        // body: updateData,
      }),
    }),
    updateBusinessPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/accounts/companies/`,
        method: "POST",
        body: data,
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

export const {
  useSignupBusinessMutation,
  useGetBusinessMutation,
  useLoginBusinessMutation,
  useUpdateBusinessProfileMutation,
  useResetPasswordBusinessMutation,
  useUpdateBusinessPasswordMutation,
  useForgotPasswordBusinessMutation,
} = BusinessApiSlice;
