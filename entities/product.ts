export interface Product {
    id: number;
    name: string;
    price: number; //also the price of bundle product
    costPrice: number;
    category: string;
    brand: string;
    isBundle: boolean;
    stocks: number;
    unitType: string;

    //bundle
    bundleType?: Product;
    bundleQuantity?: number;
}