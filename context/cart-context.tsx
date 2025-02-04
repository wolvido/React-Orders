import { Cart } from "@/entities/cart";
import { CartItem } from "@/entities/cart-item";
import { Product } from "@/entities/product";
import { createContext, useContext, ReactNode, useState } from 'react';

interface CartContextType {
    cart: Cart;
    addToCart: (item: CartItem) => void;
    removeFromCart: (product: Product) => void;
    getCart: () => Cart;
    emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0
    });

    const calculateTotal = (items: CartItem[]): number => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const addToCart = (cartItem: CartItem) => {
        setCart(prevCart => {
            // Check if product already exists in cart
            const existingItemIndex = prevCart.items.findIndex(
                item => item.product.key === cartItem.product.key
            );

            let updatedItems: CartItem[];

            if (existingItemIndex >= 0) {
                // Update existing item
                updatedItems = prevCart.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + cartItem.quantity,
                            total: (item.quantity + cartItem.quantity) * item.product.sellingPrice
                        };
                    }
                    return item;
                });
            } else {
                // Add new item
                updatedItems = [...prevCart.items, cartItem];
            }

            return {
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        });
    };

    const removeFromCart = (product: Product) => {
        setCart(prevCart => {
            const updatedItems = prevCart.items.filter(
                item => item.product.key !== product.key
            );

            return {
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        });
    };

    const getCart = (): Cart => {
        return cart;
    };

    const emptyCart = () => {
        setCart({
            items: [],
            total: 0
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            getCart,
            emptyCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
