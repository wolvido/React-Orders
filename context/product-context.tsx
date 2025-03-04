import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/entities/product';
import { ProductRepository } from '@/repositories/product-repository';

interface ProductContextType {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    reduceStock: (productId: number, quantity: number) => { success: boolean; error?: string };
    increaseStock: (productId: number, quantity: number) => void;
    updateProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [stockChanges, setStockChanges] = useState<Record<number, number>>({}); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const productRepository = new ProductRepository();

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await productRepository.getAll();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshProducts = async () => {
        setStockChanges({}); 
        await loadProducts();
    };

    const reduceStock = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            return { success: false, error: 'Product not found' };
        }

        if (product.stocks < quantity) {
            return { 
                success: false, 
                error: `Insufficient stock. Only ${product.stocks} available.` 
            };
        }

        //keep track of stock changes
        setStockChanges(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) - quantity
        }));

        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        stocks: product.stocks - quantity
                    };
                }
                return product;
            });
        });

        return { success: true };
    };

    const increaseStock = (productId: number, quantity: number) => {
        //keep track of stock changes
        setStockChanges(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + quantity
        }));

        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        stocks: product.stocks + quantity
                    };
                }
                return product;
            });
        });
    };

    /**
     * safely updates the products but retains the local product stock changes
     */
    const updateProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const newData = await productRepository.getAll();
            
            // Apply the stored changes to the new data
            const updatedProducts = newData.map(product => {
                const stockChange = stockChanges[product.id] || 0;
                return {
                    ...product,
                    stocks: product.stocks + stockChange
                };
            });

            setProducts(updatedProducts);
        } catch (err) {
            setError('Failed to update products');
            console.error('Error updating products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            isLoading,
            error,
            refreshProducts,
            reduceStock,
            increaseStock,
            updateProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
}

// Custom hook to use the product context
export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
