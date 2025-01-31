import { CartItem } from "./cart-item";

export interface Cart { //also known as Order
    id: number,
    cashier: string,
    cartItems: CartItem[],
    total: number
}

