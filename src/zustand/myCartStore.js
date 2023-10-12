import axios from "../component/utils/axios";
import { create } from "zustand";

export const useMyCartStore = create((set) => ({
  cart: [],
  isLoading: false,
  error: null,
  totalAmount: 0,
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
        .then((res) => {
          set({
            cart: res.data,
            totalAmount: res.data.reduce(
              (sum, { product, quantity }) => sum + product?.price * quantity,
              0
            ),
          });
        });
    } catch (err) {}
  },
  //   removeAllBears: () => set({ products: {} }),
}));
