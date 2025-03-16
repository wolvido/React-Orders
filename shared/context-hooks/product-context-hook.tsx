import { useProducts } from "@/shared/context/product-context";
import { Product } from "../entities/product";

//results of operation
interface StockOperationResult {
    success: boolean;
    error?: string;
}

export function useProductHook() {
    const { reduceStock, increaseStock } = useProducts();

    const handleReduceStock = (product: Product, quantity: number): StockOperationResult => {
        return reduceStock(product, quantity);
    };

    const handleIncreaseStock = (productId: number, quantity: number, isBundleId?:boolean) => {
        return increaseStock(productId, quantity, isBundleId);
    };

    return {
        reduceStock: handleReduceStock,
        increaseStock: handleIncreaseStock
    };
}
