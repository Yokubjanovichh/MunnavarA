import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
function normalizeTarget(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  return s.replace(/\/api\/v1\/?$/i, "").replace(/\/+$/g, "");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const useProxy = String(env.VITE_USE_PROXY || "") === "true";
  const target = normalizeTarget(env.VITE_PROXY_TARGET || env.VITE_API_BASE_URL);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: useProxy && target ? { proxy: { "/api": { target, changeOrigin: true, secure: true } } } : undefined,
  };
});
