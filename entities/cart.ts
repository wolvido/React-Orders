import { CartItem } from "./cart-item";

export interface Cart{
    cartItems : CartItem[];
    total: number;
}