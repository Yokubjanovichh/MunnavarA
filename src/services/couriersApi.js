import { baseApi } from "./baseApi";

export const couriersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCouriers: build.query({
      query: ({ page = 1, size = 10, search } = {}) => ({
        url: "/api/v1/backoffice/couriers/",
        params: {
          page,
          size,
          ...(search ? { search } : {}),
        },
      }),
      providesTags: (result) => {
        const items = result?.couriers ?? [];
        return [
          { type: "Couriers", id: "LIST" },
          ...items.map((c) => ({ type: "Couriers", id: c?.id })),
        ];
      },
    }),

    getCourier: build.query({
      query: (courierId) => ({
        url: `/api/v1/backoffice/couriers/${courierId}`,
      }),
      providesTags: (result, error, courierId) => [
        { type: "Couriers", id: courierId },
      ],
    }),

    createCourier: build.mutation({
      query: (body) => ({
        url: "/api/v1/backoffice/couriers/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Couriers", id: "LIST" }],
    }),

    updateCourier: build.mutation({
      query: ({ courierId, body }) => ({
        url: `/api/v1/backoffice/couriers/${courierId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Couriers", id: arg?.courierId },
        { type: "Couriers", id: "LIST" },
      ],
    }),

    blockCourier: build.mutation({
      query: (courierId) => ({
        url: `/api/v1/backoffice/couriers/${courierId}/block`,
        method: "POST",
      }),
      invalidatesTags: (result, error, courierId) => [
        { type: "Couriers", id: courierId },
        { type: "Couriers", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCouriersQuery,
  useLazyGetCourierQuery,
  useCreateCourierMutation,
  useUpdateCourierMutation,
  useBlockCourierMutation,
} = couriersApi;
