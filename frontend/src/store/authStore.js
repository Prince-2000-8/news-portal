import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios.js";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/register", { name, email, password });
          set({ user: data, token: data.token, loading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Registration failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          set({ user: data, token: data.token, loading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      updateProfile: async (payload) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.put("/users/profile", payload);
          set((state) => ({ user: { ...state.user, ...data }, loading: false }));
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Update failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },
    }),
    { name: "auth-storage" }
  )
);
