import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "munnavara.accessToken";

function loadToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw && raw.trim() ? raw : null;
  } catch {
    return null;
  }
}

const initialState = {
  accessToken: loadToken(),
  role: "admin",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const token = action?.payload?.accessToken ?? null;
      state.accessToken = token;

      try {
        if (token) localStorage.setItem(STORAGE_KEY, token);
        else localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore storage failures
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore storage failures
      }
    },
    setRole: (state, action) => {
      state.role = action?.payload ?? "admin";
    },
    setUser: (state, action) => {
      state.user = action?.payload ?? null;
    },
  },
});

export const { setCredentials, logout, setRole, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state) => state?.auth?.accessToken ?? null;
export const selectIsAuthed = (state) => Boolean(state?.auth?.accessToken);
export const selectRole = (state) => state?.auth?.role ?? "admin";
export const selectUser = (state) => state?.auth?.user ?? null;

