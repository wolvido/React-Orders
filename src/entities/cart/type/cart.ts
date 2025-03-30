import { CartItem } from "../../cart-item/type/cart-item";

export interface Cart{
    items : CartItem[];
    total: number;
    orderId: number;
}