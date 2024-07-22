import { globalClusterApi } from "../api/apiSlice";

export const ProductApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),
    product: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}/`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}/`,
        method: "POST",
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: `/products/`,
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useLazyProductsQuery, useProductsQuery,useProductMutation,useDeleteProductMutation,useAddProductMutation } = ProductApiSlice;

// const [trigger, { data, error, isLoading }] = useLazyProductsQuery();
// const { data, error, isLoading } = useProductsQuery();
// const [mutation] = useMutation();
