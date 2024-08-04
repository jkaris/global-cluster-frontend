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
        url: "/api/v1/accounts/signup/",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/accounts/token/",
        method: "POST",
        body: loginData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (updateData) => ({
        url: `/api/v1/accounts/individuals/${updateData.id}/`,
        method: "PATCH",
        body: { ...updateData },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `auth/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/register/individual/`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/api/v1/register/individual/",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useUpdateUserProfileMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
} = AuthApiSlice;
