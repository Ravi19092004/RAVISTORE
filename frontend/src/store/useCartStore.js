import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,
  error: null,

  addToCart: async (product) => {
    set({ loading: true });
    try {
      const { cart } = get();
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({ cart: updatedCart });
      } else {
        set({ cart: [...cart, { ...product, quantity: 1 }] });
      }
      toast.success("Product added to cart");
    } catch (error) {
      console.log("Error in addToCart function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      const { cart } = get();
      const updatedCart = cart.filter((item) => item.id !== productId);
      set({ cart: updatedCart });
      toast.success("Product removed from cart");
    } catch (error) {
      console.log("Error in removeFromCart function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    try {
      const { cart } = get();
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      set({ cart: updatedCart });
    } catch (error) {
      console.log("Error in updateQuantity function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
