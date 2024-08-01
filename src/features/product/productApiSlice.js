import { globalClusterApi } from "../api/apiSlice";

export const ProductApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/products/",
        method: "GET",
      }),
    }),
    product: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/${productId}/`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/${productId}/`,
        method: "DELETE",
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: `/api/v1/referrals/products/`,
        method: "POST",
        body: product,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/v1/referrals/products/${product.uuid}/`,
        method: "PUT",
        body: product.formdata,
      }),
    }),
  }),
});

export const {
  useProductsMutation,
  useProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} = ProductApiSlice;
