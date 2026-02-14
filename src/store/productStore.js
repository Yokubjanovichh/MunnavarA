import { create } from "zustand";
import { api } from "@/services/api";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: replace with real endpoint
      const res = await api.get("/admin/products");
      set({ products: res.data ?? [], isLoading: false });
    } catch (e) {
      set({ error: e, isLoading: false });
    }
  },

  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: replace with real endpoint
      const res = await api.post("/admin/products", payload);
      set((s) => ({ products: [res.data, ...s.products], isLoading: false }));
      return res.data;
    } catch (e) {
      set({ error: e, isLoading: false });
      throw e;
    }
  },
}));
