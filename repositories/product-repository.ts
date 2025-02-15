import { ProductAdapter } from "@/adapter/product-adapter";
import { BundleProduct, Product } from "../entities/product";
import app from "@/app.json";

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getBundleById(id: number): Promise<BundleProduct | null>;
}

export class ProductRepository implements IProductRepository{
    private baseUrl: string;

    constructor() {
        //this.baseUrl = app.api.baseUrl + '/Product';
        this.baseUrl = app.api.akongCpUrl + '/Product';
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
            products.forEach(async product => await this.injectBundle(product));
            return await products as T;
        }

        const product = await ProductAdapter.adapt(data);
        return await this.injectBundle(product) as T;
    }

    //method that checks if product is a bundle then injects its bundle equivalent
    private async injectBundle(product: Product): Promise<Product> {
        const bundle = await this.getBundleById(product.id);
        if (bundle) {
            bundle.category = product.category;
            bundle.brand = product.brand;
            if (!product.bundleItems) {
                product.bundleItems = []; // Initialize if undefined
            }
            product.bundleItems.push(bundle);
        }
        //isBundle is unnecessary

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

        //check if data is an array
        if (Array.isArray(data)) {
            const bundle = data.map((bundle: any) => ProductAdapter.BundleAdapt(bundle));
            return await bundle as T;
        }

        return await ProductAdapter.BundleAdapt(data) as T;
    }

    async getAll(): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/fetch-products?page=1&pageSize=999999`);
        return await this.handleResponse<Product[]>(response);
    }

    async getProductPerPage(page: number, pageSize: number): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/fetch-products?page=${page}&pageSize=${pageSize}`);
        return await this.handleResponse<Product[]>(response);
    }

    async getBundleById(productId: number): Promise<BundleProduct | null> {
        const response = await fetch(`${this.baseUrl}/fetch-bundle/${productId}`);
        return await this.handleResponseBundle<BundleProduct>(response);
    }
}