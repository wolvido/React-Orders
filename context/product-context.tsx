import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/entities/product';
import { ProductSchema } from '@/entities/product-schema';
import { ProductRepository } from '@/repositories/product-repository';
import { ProductSchemaRepository } from '@/repositories/product-schema-repository';

interface ProductContextType {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    reduceStock: (productId: number, quantity: number) => { success: boolean; error?: string };
    increaseStock: (productId: number, quantity: number, isBundleId?: boolean) => void;
    updateProducts: () => Promise<void>;
    loadProductSchemas: () => Promise<void>;
    applySchema: (productSchema: ProductSchema) => void;
    productSchemas: ProductSchema[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [stockChanges, setStockChanges] = useState<Record<number, number>>({}); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productSchemas, setProductSchemas] = useState<ProductSchema[]>([]);

    const productRepository = new ProductRepository();

    const productSchemaRepository = new ProductSchemaRepository();

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
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return { success: false, error: 'Product not found' };
        }
    
        const product = products[productIndex];

        //swap out with the original product if the product is bundled
        const targetProductId = product.isBundle ? (product.originalProductId || productId) : productId;
        const targetProduct = product.isBundle ? 
            products.find(p => p.id === targetProductId) : 
            product;

        quantity = product.isBundle ? (product.bundleQuantity || 1) * quantity : quantity;
    
        if (!targetProduct) {
            return { success: false, error: 'Target product not found' };
        }

        console.log("product name", product.name);
        console.log("stock snapshot", targetProduct?.stocks);
        console.log("quantity", quantity);

        if (quantity < 1) {
            console.log(`Invalid quantity: ${quantity}. triggered in reduceStock`);
            return { success: false, error: 'Quantity must be at least 1' };
        }

        // Check if there's enough stock
        if (targetProduct.stocks < quantity) {
            console.log(`Insufficient stock. Only ${targetProduct.stocks} available. triggered in reduceStock`);
            return { success: false, error: `Insufficient stock. Only ${targetProduct.stocks} available.` };
        }

        // Keep track of stock changes
        setStockChanges(prev => ({
            ...prev,
            [targetProductId]: (prev[targetProductId] || 0) - quantity
        }));
    
        // Update products
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === targetProductId) {
                    //prevent negative stock
                    const newStock = product.stocks - quantity;
                    if (newStock < 0) {
                        return product;
                    }
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
    
    /**
     * increases the stock of a product by a given quantity
     * @param productId 
     * @param quantity 
     * @param isBundleId determines if the product id is from a bundle product, also converts quantity into bundle quantity
     */
    const increaseStock = (productId: number, quantity: number, isBundleId?: boolean) => {

        if(isBundleId){
            const bundleProduct = products.find(p => p.id === productId);
            productId = bundleProduct?.originalProductId || 0;
            quantity = (bundleProduct?.bundleQuantity || 1) * quantity;
        }

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
     * safely updates the products by retaining the local product stock changes
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

    const loadProductSchemas = async () => {
        try {
            setIsLoading(true);
            const data = await productSchemaRepository.getAll();
            setProductSchemas(data);
        } catch (err) {
            console.error('Error loading product schemas:', err);
            throw err;
        }
    }

    const applySchema = (productSchema: ProductSchema) => {
        const { type, selectionType, modifyingValue } = productSchema;
        console.log('Applying schema context:', productSchema);

        if (selectionType === 'All') {
            console.log('Applying schema to all products...');

            //if fixed
            if (type === 'Fixed') {
                console.log('Applying fixed schema...');
                setProducts(prevProducts => {
                    return prevProducts.map(product => {
                        return {
                            ...product,
                            price: product.price - modifyingValue
                        };
                    });
                });
            }

            //if percentage
            if (type === 'Percentage') {
                console.log('Applying percentage schema...');
                setProducts(prevProducts => {
                    return prevProducts.map(product => {
                        return {
                            ...product,
                            price: product.price * (1 - modifyingValue / 100)
                        };
                    });
                });
            }

        } else if (selectionType === 'Selected') {
            console.log('Applying schema to selected products...');
            // Apply schema to selected products
            // This is a placeholder for future implementation
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
            updateProducts,
            loadProductSchemas,
            applySchema,
            productSchemas
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
