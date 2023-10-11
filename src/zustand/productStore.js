import { useAuthContext } from "../component/hooks/useAuthContext";
import axios from "../component/utils/axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  getProducts: async (payload) => {
    try {
      set({ isLoading: true });
      const response = axios
        .post("/api/product", payload, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => res.data)
        .then((res) => set({ products: res.data }));
    } catch (err) {}
  },
  //   removeAllBears: () => set({ products: {} }),
}));
