import { globalClusterApi } from "../api/apiSlice";

export const UserApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyProductsQuery, useProductsQuery }  = UserApiSlice

// const [trigger, { data, error, isLoading }] = useLazyProductsQuery();
// const { data, error, isLoading } = useProductsQuery();

