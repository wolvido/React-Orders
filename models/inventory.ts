import { Item } from "./item";

export interface Inventory {
    id: number,
    item: Item,
    quantity: number
}