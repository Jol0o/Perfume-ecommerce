import { create } from "zustand";
export const useUserStore = create((set) => ({
    product: [],
    cart: [],
    filter: [],
    updateCart: (cart) => set(state => ({ cart: cart })),
    updateProduct: (product) => set(state => ({ product: product })),
    updateFilter: (filter) => set(state => ({ filter: filter }))
}));
