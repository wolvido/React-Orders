import { useProductHook } from "@/context-hooks/product-context-hook";
import { Cart } from "@/entities/cart";
import { CartItem } from "@/entities/cart-item";
import { Product } from "@/entities/product";
import { createContext, useContext, ReactNode, useState } from 'react';

interface CartContextType {
    cart: Cart;
    addToCart: (item: CartItem) => {success: boolean, error?: string};
    removeFromCart: (product: Product) => void;
    getCart: () => Cart;
    setCart: (cart: Cart) => void;
    emptyCart: () => void;
    BundleProductToCart: (product: Product, quantity: number) => {success: boolean, error?: string};
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
    
        // If the item already exists in the cart, update the quantity and total of the existing item
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

        return { success: true };
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

                //if the individual quantity exceeds its bundle quantity, convert into its bundle equivalent
                if (newTotalQuantity >= product.bundleQuantity) {

                    //divide the individual quantity into bundles
                    const bundlesCount = Math.floor(newTotalQuantity / product.bundleQuantity);

                    //get the remaining quantity after converting to bundles
                    const remainingItems = newTotalQuantity % product.bundleQuantity;

                    //add the bundle and its bundle quantity to the cart
                    updatedItems = cartItemUpdater(updatedItems, {
                        product: product.bundleType,
                        quantity: bundlesCount,
                        total: product.bundleType.price * bundlesCount,
                        id: 0 //0 because it is a new item, will not conflict because cart-context uses id to check and remove

                    });

                    //add the remaining items to the cart that was not enough for a bundle
                    if (remainingItems > 0) {
                        updatedItems = cartItemUpdater(updatedItems, {
                            product: product,
                            quantity: remainingItems,
                            total: product.price * remainingItems,
                            id: existingCartItem?.id || 0
                        });
                        console.log('individual id after bundle', existingCartItem?.id);
                    }

                } else {
                    updatedItems = cartItemUpdater(updatedItems, {
                        product: product,
                        quantity: newTotalQuantity,
                        total: product.price * newTotalQuantity,
                        id: existingCartItem?.id || 0
                    });
                }
            } else {
                updatedItems = cartItemUpdater(updatedItems, {
                    product: product,
                    quantity: newTotalQuantity,
                    total: product.price * newTotalQuantity,
                    id: existingCartItem?.id || 0
                });
            }
    
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                orderId: prevCart.orderId
            };
        });

        return { success: true };
    };
    
    const removeFromCart = (product: Product) => {
        setCart(prevCart => {

            const itemIndex = prevCart.items.findIndex(item => 
                item.product.id === product.id
            );
    
            if (itemIndex === -1) {
                console.error('Item not found in cart');
                console.error('Product Id:', product.id);
                console.error('Product Name:', product.name);
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
                    increaseStock(cartItem.product.id, removedBundleQuantity, true);
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
            setCart,
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