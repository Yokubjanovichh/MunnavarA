import { create } from "zustand";
import { api } from "@/services/api";

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: replace with real endpoint
      const res = await api.get("/admin/orders");
      set({ orders: res.data ?? [], isLoading: false });
    } catch (e) {
      set({ error: e, isLoading: false });
    }
  },
}));
