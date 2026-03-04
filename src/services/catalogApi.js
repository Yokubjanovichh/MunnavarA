import { baseApi } from "./baseApi";

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCatalog: build.query({
      query: ({ skip = 0, limit = 50, product_type } = {}) => ({
        url: "/api/v1/backoffice/catalog/",
        params: { skip, limit, product_type },
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              { type: "Catalog", id: "LIST" },
              ...result.map((p) => ({ type: "Catalog", id: p?.id })),
            ]
          : [{ type: "Catalog", id: "LIST" }],
    }),
    createProduct: build.mutation({
      query: (body) => ({
        url: "/api/v1/backoffice/catalog",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Catalog", id: "LIST" }],
    }),
    updateProduct: build.mutation({
      query: ({ product_id, body }) => ({
        url: `/api/v1/backoffice/catalog/${product_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Catalog", id: "LIST" },
        { type: "Catalog", id: arg?.product_id },
      ],
    }),
    archiveProduct: build.mutation({
      query: (product_id) => ({
        url: `/api/v1/backoffice/catalog/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Catalog", id: "LIST" },
        { type: "Catalog", id: arg },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCatalogQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useArchiveProductMutation,
} = catalogApi;
