import { Item } from "./item";

export interface CartItem {
    id: number,    
    item: Item,
    quantity: number,
    total: number
}