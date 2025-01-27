import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { InventoryContext } from './inventory-context';

//context type, its definition
interface CartContextType {
    cart: Cart; 
    addItemsByQuantity: (item: CartItem) => void;
    handleSubmit: () => Promise<void>;
    getItems: () => CartItem[];
    setOrder: (order: Cart) => void;
}

//cart functionality context
export const CartContext = createContext<CartContextType>({
    cart: {cartItems: [], cashier:"", id: 0, total: 0},
    addItemsByQuantity: (item: CartItem) => {},
    handleSubmit: async () => {},
    getItems: () => [],
    setOrder: (order: Cart) => {}
});

//handles cart context so that it can be used in the layout easily
function CartContextProvider({initialValue, children}: {initialValue: Cart, children: ReactNode}) {

    //coupled with inventory context, need to decoupe later when app gets larger
    const inventoryContext = useContext(InventoryContext);

    const [cart, setCart] = useState(initialValue);

    const RecalculateCart = (cartItem: CartItem, newQuantity: number) => {
        const itemId = cartItem.item.id;

        const updatedCartItems = cart.cartItems.map((cartItem) => {
            if (cartItem.item.id === itemId) {
                return { ...cartItem, quantity: Number(cartItem.quantity) + Number(newQuantity), total: Number(cartItem.item.price) * (Number(cartItem.quantity) + Number(newQuantity)) };
            }
            return cartItem;
        });

        return updatedCartItems;
    };

    const addItemsByQuantity = (cartItem: CartItem) => {
        //get the item id from the cart item
        const itemId = cartItem.item.id;
        //get the cart items from the cart
        const cartItems = cart.cartItems;
        //get the item ids from the cart items
        const itemIds = cartItems.map((cartItem) => cartItem.item.id);
        //get the index of the item in the cart
        const itemIndex = itemIds.indexOf(itemId);

        let updatedCartItems;
        //if the item is in the cart, update the quantity
        if (itemIndex !== -1) {
            updatedCartItems = RecalculateCart(cart.cartItems[itemIndex], cartItem.quantity);
        } else {
            //if the item is not in the cart, add the item to the cart
            updatedCartItems = [...cart.cartItems, { ...cartItem }];
        }

        setCart({ ...cart, cartItems: updatedCartItems });
    };

    const handleSubmit = async () => {
        inventoryContext.reduceInventory(cart);

        //reset cart
        setCart({cartItems: [], cashier:"", id: 0, total: 0});
    };

    const setOrder = (order: Cart) => {
        setCart(order);
    };

    const getItems = () => cart.cartItems;

    const value = {
        cart: cart,
        addItemsByQuantity: addItemsByQuantity,
        handleSubmit: handleSubmit,
        getItems: getItems,
        setOrder: setOrder
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;