import { baseApi } from "./baseApi";
import { setRole, setUser } from "@/features/auth/authSlice";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({ url: "/api/v1/backoffice/profile/me" }),
      providesTags: ["Profile"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setUser(data));
            if (data?.role) dispatch(setRole(data.role));
          }
        } catch {
          // ignore; auth failures are handled by callers/logouts
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery } = profileApi;

