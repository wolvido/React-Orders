import { Inventory } from "./inventory";

export interface Product {
    key: number;
    name: string;
    sellingPrice: number;
    costPrice: number;
    units: 'CASE' | 'JAR' | 'BUNDLE';
    stocks: number;
    category: string;
    brand: string;
}