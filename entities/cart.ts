import { CartItem } from "./cart-item";

export interface Cart{
    items : CartItem[];
    total: number;
    orderId: number;
}