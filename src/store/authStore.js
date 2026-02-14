import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: null,
  role: "admin",
  user: null,

  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  setUser: (user) => set({ user }),

  logout: () => set({ token: null, user: null }),

  isAuthed: () => Boolean(get().token),
}));
