import { create } from "zustand";
import { api } from "@/services/api";

const AUTO_MOCK_IF_NO_API =
  import.meta.env.PROD && !String(import.meta.env.VITE_API_URL || "").trim();

const MOCK_PRODUCTS = Array.from({ length: 10 }).map((_, i) => ({
  id: 123000 + i,
  name: "Suv 25 litr",
  createdAt: [
    "24 Dec 2024",
    "10 Dec 2024",
    "27 Nov 2024",
    "18 Nov 2024",
    "06 Nov 2024",
    "25 Oct 2024",
    "14 Oct 2024",
    "03 Oct 2024",
    "20 Sep 2024",
    "10 Sep 2024",
  ][i],
  size: "25-L",
  qty: "100-Dona",
}));

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      if (AUTO_MOCK_IF_NO_API) {
        set({ products: MOCK_PRODUCTS, isLoading: false });
        return;
      }

      const res = await api.get("/admin/products");
      set({ products: res.data ?? [], isLoading: false });
    } catch (e) {
      set({ error: e, isLoading: false });
    }
  },

  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      if (AUTO_MOCK_IF_NO_API) {
        const created = {
          id: Date.now(),
          createdAt: new Date().toISOString().slice(0, 10),
          ...(payload ?? {}),
        };
        set((s) => ({ products: [created, ...s.products], isLoading: false }));
        return created;
      }

      const res = await api.post("/admin/products", payload);
      set((s) => ({ products: [res.data, ...s.products], isLoading: false }));
      return res.data;
    } catch (e) {
      set({ error: e, isLoading: false });
      throw e;
    }
  },
}));
