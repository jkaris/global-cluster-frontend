import { globalClusterApi } from "../api/apiSlice";

export const TicketApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyProductsQuery, useProductsQuery }  = TicketApiSlice

// const [trigger, { data, error, isLoading }] = useLazyProductsQuery();
// const { data, error, isLoading } = useProductsQuery();

