import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../../../entities/product';
import { ProductSchema } from '../../../entities/product-schema';
import { ProductRepository } from '@/repositories/product-repository';
import { ProductSchemaRepository } from '@/repositories/product-schema-repository';
import { ProductSchemaLineRepository } from '@/repositories/product-schema-line-repository';

interface ProductContextType {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    reduceStock: (product: Product, quantity: number) => { success: boolean; error?: string };
    increaseStock: (productId: number, quantity: number, isBundleId?: boolean) => void;
    updateProducts: () => Promise<void>;
    loadProductSchemas: () => Promise<void>;
    applySchema: (productSchema: ProductSchema) => void;
    productSchemas: ProductSchema[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [stockChanges, setStockChanges] = useState<Record<number, number>>({}); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productSchemas, setProductSchemas] = useState<ProductSchema[]>([]);
    const [selectedSchema, setSelectedSchema] = useState<ProductSchema | null>(null);

    const productRepository = new ProductRepository();
    const productSchemaRepository = new ProductSchemaRepository();
    const productSchemaLineRepository = new ProductSchemaLineRepository();
    
    const loadProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await productRepository.getAll();
            setProducts(data);
            setOriginalProducts(data);
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

    const reduceStock = (product: Product, quantity: number) => {
        const targetProductId = product.isBundle ? (product.originalProductId || product.id) : product.id;
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
     * @description safely updates the products by retaining the local product stock changes and applying selected pricing schema
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

            if (selectedSchema) {
                applySchema(selectedSchema);
            }

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
            const data: ProductSchema[] = await productSchemaRepository.getAll();

            setProductSchemas(data);
        } catch (err) {
            console.error('Error loading product schemas:', err);
            throw err;
        }
    }

    const applySchema = async (productSchema: ProductSchema) => {
        const { type, selectionType, modifyingValue } = productSchema;
        console.log('Applying schema context:', productSchema);
        
        // Reset prices to original values before schema application, so schemas don't stack
        const originalPriceMap = Object.fromEntries(
            originalProducts.map(p => [p.id, p.price])
        );
        setProducts(prevProducts => prevProducts.map(product => ({
            ...product,
            price: originalPriceMap[product.id] || product.price
        }))); // might cause infinite loop if not handled properly in application layer
        
        if (productSchema.id > 0) {
            setSelectedSchema(productSchema); //save the selected schema
        }

        if (selectionType === 'All') {
            console.log('Applying schema to all products...');

            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    let newPrice = product.price;

                    if (type === 'Fixed') {
                        newPrice = product.price + modifyingValue;
                    } 
                    else if (type === 'Percentage') {
                        let priceInCentavos = Math.round(product.price * 100);  // Convert to centavos
                        let modifiedPriceInCentavos = Math.round(priceInCentavos * (1 + modifyingValue / 100)); 
                        newPrice = modifiedPriceInCentavos / 100;  // Convert back to pesos
                    }
                    else {
                        console.log('Invalid schema:', productSchema);
                    }

                    // Ensure price doesn't go below 0
                    newPrice = Math.max(0, newPrice);

                    return {
                        ...product,
                        price: newPrice
                    };
                });
            });

        } else if (selectionType === 'Selected' || type === 'Custom' || type === 'Mixed' || type === 'Overwrite') {
            console.log('Applying schema to selected products...');
            await applySchemalines(productSchema);
        }
    };

    const applySchemalines = async (productSchema: ProductSchema) => {
        const schemaLines = await productSchemaLineRepository.getSchemaLinesBySchemaId(productSchema.id);
    
        // Calculate all price updates
        const updates = schemaLines.reduce((acc, schema) => {
            const product = products.find(p => p.id === schema.productId);
            if (!product) {
                console.log('Product not found for schema line:', schema);
                return acc;
            }
    
            let newPrice = product.price;
            switch (schema.type) {
                case 'Fixed':
                    newPrice = product.price + schema.modifyingValue;
                    break;
                case 'Percentage':
                    const priceInCentavos = Math.round(product.price * 100);
                    const modifiedPriceInCentavos = Math.round(priceInCentavos * (1 + schema.modifyingValue / 100));
                    newPrice = modifiedPriceInCentavos / 100;
                    break;
                case 'Overwrite':
                    newPrice = schema.modifyingValue;
                    break;
                default: 
                    console.log('Invalid schema line type:', schema);
                    break;
            }
    
            acc[schema.productId] = Math.max(0, newPrice);
            return acc;
        }, {} as Record<string | number, number>);
    
        // Apply all updates in a single state update
        setProducts(prevProducts =>
            prevProducts.map(products =>
                updates[products.id] !== undefined 
                    ? { ...products, price: updates[products.id] }
                    : products
            )
        );
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
