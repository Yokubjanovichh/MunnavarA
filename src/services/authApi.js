import { baseApi } from "./baseApi";

function toFormUrlEncoded(body) {
  const params = new URLSearchParams();
  Object.entries(body ?? {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    params.set(k, String(v));
  });
  return params;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ username, password, scope = "" } = {}) => ({
        // Avoid 307 redirects (slash vs no-slash) which can trigger CORS blocks.
        url: "/api/v1/auth/login",
        method: "POST",
        body: toFormUrlEncoded({
          username,
          password,
          scope,
        }),
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/api/v1/auth/register/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;

