import { useProducts } from "@/context/product-context";

//results of operation
interface StockOperationResult {
    success: boolean;
    error?: string;
}

export function useProductHook() {
    const { reduceStock, increaseStock } = useProducts();

    const handleReduceStock = (productId: number, quantity: number): StockOperationResult => {
        return reduceStock(productId, quantity);
    };

    const handleIncreaseStock = (productId: number, quantity: number, isBundleId?:boolean) => {
        return increaseStock(productId, quantity, isBundleId);
    };

    return {
        reduceStock: handleReduceStock,
        increaseStock: handleIncreaseStock
    };
}
