import { globalClusterApi } from "../api/apiSlice";

export const ProductApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.mutation({
      query: () => ({
        url: "/api/v1/products/",
        method: "GET",
      }),
    }),
    product: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/products/${productId}/`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/products/${productId}/`,
        method: "DELETE",
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: `/api/v1/products/`,
        method: "POST",
        body: product,
        headers: {
          'Content-Type': 'multipart/form-data', // This should be omitted as the browser will set it correctly
        },
      }),
    }),
  }),
});

export const { useProductsMutation,useProductMutation,useDeleteProductMutation,useAddProductMutation } = ProductApiSlice;

// const [trigger, { data, error, isLoading }] = useLazyProductsQuery();
// const { data, error, isLoading } = useProductsQuery();
// const [mutation] = useMutation();
