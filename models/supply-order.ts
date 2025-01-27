import { Inventory } from "./inventory";

export interface SupplyOrder {
    id: number,
    supplyOrderItems: Inventory[],
    supplier: string
}