export interface Product {
    key: number;
    name: string;
    sellingPrice: number;
    costPrice: number;
    unitType: 'CASE' | 'JAR' | 'BUNDLE';
    stocks: number;
    category: string;
    brand: string;
}