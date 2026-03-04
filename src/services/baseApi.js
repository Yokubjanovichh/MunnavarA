import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function normalizeBaseUrl(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return s;
  // Allow envs like ".../api/v1/" while keeping endpoints "/api/v1/...".
  return s.replace(/\/api\/v1\/?$/i, "").replace(/\/+$/g, "");
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.DEV && String(import.meta.env.VITE_USE_PROXY) === "true"
        ? ""
        : normalizeBaseUrl(
            import.meta.env.VITE_API_BASE_URL ??
              import.meta.env.VITE_API_URL ??
              (import.meta.env.DEV ? "http://localhost:3000" : ""),
          ),
    prepareHeaders: (headers, { getState }) => {
      const token = getState?.()?.auth?.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Auth", "Profile", "Users", "Couriers", "Catalog", "Analytics"],
  endpoints: () => ({}),
});
