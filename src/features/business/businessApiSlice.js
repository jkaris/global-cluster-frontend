import { globalClusterApi } from "../api/apiSlice";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
/**
 * BusinessApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const BusinessApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signupBusiness: builder.mutation({
      query: (signupData) => ({
        url: "/api/v1/accounts/signup/",
        method: "POST",
        body: signupData,
        headers: { Authorization: "" },
      }),
    }),
    getBusiness: builder.mutation({
      query: () => ({
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
      query: ({ user_id, updateData }) => ({
        url: `/api/v1/accounts/companies/${user_id}/`,
        method: "PATCH",
        body: updateData,
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }),
    }),
    updateBusinessPassword: builder.mutation({
      query: (user_id, data) => ({
        url: `/api/v1/accounts/companies/${user_id}/`,
        method: "PATCH",
        body: { ...data },
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
