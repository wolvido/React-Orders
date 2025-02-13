interface ProductBase {
    id: number;
    name: string;
    sellingPrice: number;
    costPrice: number;
    category: string;
    brand: string;
}

export interface Product extends ProductBase {
    stocks: number;
    isBundle: boolean;
    bundleItems: BundleProduct[];
    unitType: 'CASE' | 'JAR';
}

export interface BundleProduct extends ProductBase {
    bundleQuantity: number;
    unitType: 'BUNDLE';
}