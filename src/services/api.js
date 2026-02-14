import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const resolvedBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3000" : "");

export const api = axios.create({
  baseURL: resolvedBaseUrl,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      if (typeof logout === "function") logout();
    }
    return Promise.reject(error);
  },
);
