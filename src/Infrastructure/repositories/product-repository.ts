import { ProductAdapter } from "@/src/infrastructure/adapter/product-adapter";
import { Product } from "@/src/entities/product/type/product";
import app from "@/app.json";
import { BundleLineDTO } from "@/src/infrastructure/adapter/bundleLine-adapter";
import { useApiConfig } from "@/src/shared/lib/api/api-config-context";

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getProductPerPage(page: number, pageSize: number): Promise<Product[]>;
    getBundleById(id: number): Promise<Product | null>;
    getBundleLine(id: number): Promise<BundleLineDTO | null>;
}

export class ProductRepository implements IProductRepository{
    private baseUrl: string;

    constructor() {

        const { getApiUrl, hasApiUrl } = useApiConfig();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Product';
        }
        else{
            this.baseUrl = app.api.main + '/Product';
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        //check if data is an array
        if (Array.isArray(data)) {
            const products = data.map((product: any) => ProductAdapter.adapt(product));
            
            // Filter out bundle products
            const filteredProducts = products.filter(product => !product.isBundle);
            
            // Wait for all injectBundle operations to complete
            const enhancedProducts = await Promise.all(
                filteredProducts.map(product => this.injectBundle(product))
            );
            
            // extract bundle types after all promises have resolved
            const bundleTypes = Array.from(
                new Map(
                    enhancedProducts
                        .filter(product => product.bundleType !== undefined)
                        .map(product => [product.bundleType!.id, product.bundleType!])
                ).values()
            );

            console.log('bundleType sample:', bundleTypes[0]);
            
            // Add bundleTypes to products
            const allProducts = [...enhancedProducts, ...bundleTypes];
            
            return allProducts as T;
        }

        const product = await ProductAdapter.adapt(data);
        return await this.injectBundle(product) as T;
    }

    //method that checks if product is a bundle then injects its bundle equivalent
    private async injectBundle(product: Product): Promise<Product> {
        if (product.isBundle) {
            return product;
        }

        const bundle = await this.getBundleById(product.id);
        const bundleLine = await this.getBundleLine(product.id);

        product.bundleQuantity = bundleLine?.quantity;
        product.bundleType = bundle ?? undefined;
        if (product.bundleType) {
            product.bundleType.bundleQuantity = bundleLine?.quantity;
            product.bundleType.originalProductId = product.id;
        }

        return product;
    }

    private async handleResponseBundle<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        return await data as T;
    }

    async getAll(): Promise<Product[]> {
        console.log('from repository-Fetching [products]...');
        try {
            const response = await fetch(`${this.baseUrl}/fetch-products?page=1&pageSize=99999`);
            if (!response.ok) {
                console.log('response not ok');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('products response ok');

        return await this.handleResponse<Product[]>(response);

        }
        catch (error) {
            console.error('Error in getAll Products:', error);
            throw error;
        }
    }

    async getProductPerPage(page: number, pageSize: number): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/fetch-products?page=${page}&pageSize=${pageSize}`);
        return await this.handleResponse<Product[]>(response);
    }

    async getBundleById(productId: number): Promise<Product | null> {
        const response = await fetch(`${this.baseUrl}/fetch-bundle-product/${productId}`);
        const quantity = await this.getBundleQuantityById(productId);
        const bundle =  await this.handleResponse<Product>(response);

        if (bundle) {
            bundle.bundleQuantity = quantity;
        }

        return bundle;
    }

    async getBundleLine(productId: number): Promise<BundleLineDTO | null> {
        const response = await fetch(`${this.baseUrl}/fetch-bundleLine/${productId}`);
        return await this.handleResponseBundle<BundleLineDTO>(response);
    }

    async getProductById(productId: number): Promise<Product | null> {
        const response = await fetch(`${this.baseUrl}/fetch-product/${productId}`);
        return await this.handleResponse<Product>(response);
    }

    async getBundleQuantityById(productId: number): Promise<number> {
        const response = await this.getBundleLine(productId);
        return response?.quantity || 0;
    }

}