import { useAuthContext } from "../component/hooks/useAuthContext";
import axios from "../component/utils/axios";
import { create } from "zustand";

export const useMyCartStore = create((set) => ({
  cart: [],
  isLoading: false,
  error: null,
  getCart: async (payload) => {
    try {
      set({ isLoading: true });
      const response = axios
        .post("/api/cart", payload, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => res.data)
        .then((res) => set({ cart: res.data }));
    } catch (err) {}
  },
  //   removeAllBears: () => set({ products: {} }),
}));
