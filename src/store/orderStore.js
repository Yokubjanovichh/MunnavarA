import { create } from "zustand";
import { api } from "@/services/api";

const AUTO_MOCK_IF_NO_API =
  import.meta.env.PROD && !String(import.meta.env.VITE_API_URL || "").trim();

const MOCK_ORDERS = Array.from({ length: 12 }).map((_, i) => {
  const id = 100100 + i;
  return {
    id,
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
      "01 Sep 2024",
      "20 Aug 2024",
    ][i % 12],
    productId: `PR-${id}`,
    productName: "Suv 25 litr",
    client: ["Andy Smith", "John Doe", "Sam Wilson"][i % 3],
    phone: "+998 (90) 000-00-00",
    address: "Chilonzor, 12-mavze",
    courier: ["Andy Smith", "Michael", "Sarah"][i % 3],
    size: "25-L",
    qty: `${(i % 5) + 1}-Dona`,
    orderType: ["Butilka bilan", "Butilkasiz"][i % 2],
    payment: ["Naqd", "Karta"][i % 2],
    orderSum: "250,000 Som",
    clientPays: "250,000 Som",
    shortage: "0 Som",
    shortageReason: "",
    status: ["pending", "delivered", "canceled"][i % 3],
  };
});

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      if (AUTO_MOCK_IF_NO_API) {
        set({ orders: MOCK_ORDERS, isLoading: false });
        return;
      }

      const res = await api.get("/admin/orders");
      set({ orders: res.data ?? [], isLoading: false });
    } catch (e) {
      set({ error: e, isLoading: false });
    }
  },
}));
