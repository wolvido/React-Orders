import { useProductHook } from "@/context-hooks/product-context-hook";
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
    BundleProductToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { reduceStock, increaseStock } = useProductHook();

    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0,
        orderId: 0
    });

    const calculateTotal = (items: CartItem[]): number => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const cartItemUpdater = (prevItems: CartItem[], newItem: CartItem): CartItem[] => {
        const existingItemIndex = prevItems.findIndex(
            item => item.product.id === newItem.product.id
        );
    
        if (existingItemIndex >= 0) {
            return prevItems.map((item, index) =>
                index === existingItemIndex
                    ? {
                        ...item,
                        quantity: item.quantity + newItem.quantity,
                        total: (item.quantity + newItem.quantity) * item.product.price
                    }
                    : item
            );
        } else {
            return [newItem, ...prevItems];
        }
    };

    const addToCart = (cartItem: CartItem) => {
        // First check stock availability
        const stockResult = reduceStock(cartItem.product.id, cartItem.quantity);
        if (!stockResult.success) {
            return { success: false, error: stockResult.error };
        }

        setCart(prevCart => {
            const updatedItems = cartItemUpdater(prevCart.items, cartItem);
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                orderId: prevCart.orderId
            };
        });
    };

    /**
     * @param product
     * @param quantity
     * @remarks
     * converts product and quantity into its bundle equivalent and adds it to the cart as a cart item
     * if no bundle equivalent is found, the product is directly converted to a cart item with the given quantity
     */
    const BundleProductToCart = (product: Product, quantity: number) => {

        const stockResult = reduceStock(product.id, quantity);
        if (!stockResult.success) {
            return { success: false, error: stockResult.error };
        };

        setCart(prevCart => {
            let updatedItems = prevCart.items.filter(item => item.product.id !== product.id);
    
            const existingCartItem = prevCart.items.find(item => item.product.id === product.id);
            const existingQuantity = existingCartItem ? existingCartItem.quantity : 0;
            const newTotalQuantity = existingQuantity + quantity;
    
            if (product.bundleType && product.bundleQuantity) {
                if (newTotalQuantity >= product.bundleQuantity) {
                    const bundlesCount = Math.floor(newTotalQuantity / product.bundleQuantity);
                    const remainingItems = newTotalQuantity % product.bundleQuantity;
    
                    updatedItems = cartItemUpdater(updatedItems, {
                        product: product.bundleType,
                        quantity: bundlesCount,
                        total: product.bundleType.price * bundlesCount
                    });
    
                    if (remainingItems > 0) {
                        updatedItems = cartItemUpdater(updatedItems, {
                            product: product,
                            quantity: remainingItems,
                            total: product.price * remainingItems
                        });
                    }
                } else {
                    updatedItems = cartItemUpdater(updatedItems, {
                        product: product,
                        quantity: newTotalQuantity,
                        total: product.price * newTotalQuantity
                    });
                }
            } else {
                updatedItems = cartItemUpdater(updatedItems, {
                    product: product,
                    quantity: newTotalQuantity,
                    total: product.price * newTotalQuantity
                });
            }
    
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                orderId: prevCart.orderId
            };
        });
    };
    
    const removeFromCart = (product: Product) => {
        setCart(prevCart => {
            const itemIndex = prevCart.items.findIndex(item => 
                item.product.id === product.id
            );
    
            if (itemIndex === -1) {
                console.error('Item not found in cart');
                return prevCart;
            }

            const cartItem = prevCart.items[itemIndex];

            // Get quantity before removing
            const removedQuantity = cartItem.quantity;

            // If the item is a bundle, get the individual quantity of the bundle
            const removedBundleQuantity = cartItem.quantity * (cartItem.product.bundleQuantity || 1);

            // Slice out the item
            const updatedItems = [
                ...prevCart.items.slice(0, itemIndex),
                ...prevCart.items.slice(itemIndex + 1)
            ];

            // Increase stock with the removed quantity
            if (cartItem.product.isBundle) {

                //get the original id of the non-bundle product
                if(cartItem.product.originalProductId){
                    increaseStock(cartItem.product.originalProductId, removedBundleQuantity);
                }
                else{
                    increaseStock(cartItem.product.id, removedBundleQuantity);
                    console.error('Original Product Id not found');
                }
            }
            else{
                console.log('Removed Quantity individual:', removedQuantity);
                increaseStock(product.id, removedQuantity);
            }
            
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                orderId: prevCart.orderId
            };
        });
    };

    const getCart = (): Cart => {
        return cart;
    };

    const emptyCart = () => {
        setCart({
            items: [],
            total: 0,
            orderId: 0
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            getCart,
            emptyCart,
            BundleProductToCart
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