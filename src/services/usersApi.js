import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ skip = 0, limit = 50 } = {}) => ({
        url: "/api/v1/backoffice/clients/",
        params: { skip, limit },
      }),
      providesTags: (result) => {
        const items = result?.users ?? [];
        return [
          { type: "Users", id: "LIST" },
          ...items.map((u) => ({ type: "Users", id: u?.id })),
        ];
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = usersApi;

