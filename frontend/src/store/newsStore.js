import { create } from "zustand";
import api from "../api/axios.js";

export const useNewsStore = create((set, get) => ({
  topNews: [],
  newsList: [],
  page: 1,
  pages: 1,
  total: 0,
  currentNews: null,
  myNews: [],
  loading: false,
  error: null,

  fetchTopNews: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/news/top");
      set({ topNews: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load top news", loading: false });
    }
  },

  fetchNews: async ({ page = 1, category = "All", keyword = "" } = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/news", { params: { page, category, keyword } });
      set({ newsList: data.news, page: data.page, pages: data.pages, total: data.total, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load news", loading: false });
    }
  },

  fetchNewsById: async (id) => {
    set({ loading: true, currentNews: null, error: null });
    try {
      const { data } = await api.get(`/news/${id}`);
      set({ currentNews: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "News not found", loading: false });
    }
  },

  fetchMyNews: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/news/mynews");
      set({ myNews: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load your news", loading: false });
    }
  },

  createNews: async (payload) => {
    try {
      const { data } = await api.post("/news", payload);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to publish" };
    }
  },

  updateNews: async (id, payload) => {
    try {
      const { data } = await api.put(`/news/${id}`, payload);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update" };
    }
  },

  deleteNews: async (id) => {
    try {
      await api.delete(`/news/${id}`);
      set((state) => ({ myNews: state.myNews.filter((n) => n._id !== id) }));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete" };
    }
  },
}));
