import { globalClusterApi } from "../api/apiSlice";

export const UserApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: "/api/v1/users",
        method: "POST",
      }),
    }),
    payout: builder.mutation({
      query: () => ({
        url: "/api/v1/payout",
        method: "POST",
      }),
    }),
    wallet: builder.mutation({
      query: () => ({
        url: "/api/v1/wallet",
        method: "POST",
      }),
    }),
    members: builder.mutation({
      query: () => ({
        url: "/api/v1/members",
        method: "POST",
      }),
    }),
    ranking: builder.mutation({
      query: (user_id) => ({
        url: `/api/v1/referrals/userrankings/${user_id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  usePayoutMutation,
  useWalletMutation,
  useMembersMutation,
  useRankingMutation,
} = UserApiSlice;
