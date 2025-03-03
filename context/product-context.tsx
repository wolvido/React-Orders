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
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
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

    return (
        <ProductContext.Provider value={{
            products,
            isLoading,
            error,
            refreshProducts,
            reduceStock,
            increaseStock
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
