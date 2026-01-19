import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/shared/types';
import toast from 'react-hot-toast';

interface CartState {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setIsOpen: (isOpen: boolean) => void;

    // Computed (will be derived from state in components, but we provide helpers)
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getSubtotal: () => number;
    getTax: () => number; // 19% IVA
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product: Product, quantity = 1) => {
                const { items } = get();
                const existingItem = items.find((item) => item.product.id === product.id);

                if (existingItem) {
                    if (existingItem.quantity + quantity > product.stock) {
                        toast.error(`Solo hay ${product.stock} unidades disponibles de ${product.name}`);
                        return;
                    }
                    set({
                        items: items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                        isOpen: true,
                    });
                    toast.success('Producto actualizado en el carrito');
                } else {
                    if (quantity > product.stock) {
                        toast.error(`Solo hay ${product.stock} unidades disponibles de ${product.name}`);
                        return;
                    }
                    set({
                        items: [...items, { product, quantity }],
                        isOpen: true,
                    });
                    toast.success('Producto agregado al carrito');
                }
            },

            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
                toast.success('Producto eliminado del carrito');
            },

            updateQuantity: (productId: string, quantity: number) => {
                const { items } = get();
                const item = items.find((i) => i.product.id === productId);

                if (!item) return;

                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                if (quantity > item.product.stock) {
                    toast.error(`Solo hay ${item.product.stock} unidades disponibles`);
                    return;
                }

                set({
                    items: items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            setIsOpen: (isOpen: boolean) => set({ isOpen }),

            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                const { items } = get();
                // Assuming price in DB includes tax or not? 
                // For this example, let's assume price is base price.
                // Or usually retail price includes tax. 
                // Let's assume price is final price for simplicity unless specified otherwise in prompt.
                // Prompt says: getSubtotal, getTax (19%), getTotalPrice.
                // Usually Subtotal + Tax = Total.
                // So let's assume item price is unit price before tax? Or item price is generic and we split it?
                // Let's assume Unit Price is Subtotal Unit Price.
                return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
            },

            getTax: () => {
                const subtotal = get().getSubtotal();
                return subtotal * 0.19;
            },

            getTotalPrice: () => {
                return get().getSubtotal() + get().getTax();
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }), // Don't persist things like 'isOpen'
        }
    )
);
