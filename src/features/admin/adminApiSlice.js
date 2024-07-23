import { globalClusterApi } from "../api/apiSlice";

/**
 * AdminApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const AdminApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    // signupAdmin: builder.mutation({
    //   query: (signupData) => ({
    //     url: "/register/company/",
    //     method: "POST",
    //     body: signupData,
    //   }),
    // }),
    loginAdmin: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/login/",
        method: "POST",
        body: loginData,
      }),
    }),
    resetPasswordAdmin: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/register/company/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    forgotPasswordAdmin: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/register/company/forgot",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useResetPasswordAdminMutation,
  useForgotPasswordAdminMutation,
} = AdminApiSlice;
