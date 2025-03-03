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

    const handleIncreaseStock = (productId: number, quantity: number) => {
        return increaseStock(productId, quantity);
    };

    return {
        reduceStock: handleReduceStock,
        increaseStock: handleIncreaseStock
    };
}
