import { ProductAdapter } from "@/adapter/product-adapter";
import { Product } from "../entities/product";
import app from "@/app.json";
import { BundleLineDTO } from "@/adapter/bundleLine-adapter";

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getProductPerPage(page: number, pageSize: number): Promise<Product[]>;
    getBundleById(id: number): Promise<Product | null>;
    getBundleLine(id: number): Promise<BundleLineDTO | null>;
}

export class ProductRepository implements IProductRepository{
    private baseUrl: string;

    constructor() {
        //this.baseUrl = app.api.baseUrl + '/Product';
        this.baseUrl = app.api.main + '/Product';
        //this.baseUrl = app.api.mlangUrl + '/Product';
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
        if (product.isBundle) {
            return product;
        }

        const bundle = await this.getBundleById(product.id);
        const bundleLine = await this.getBundleLine(product.id);

        product.bundleType = bundle ?? undefined;
        product.bundleQuantity = bundleLine?.quantity;

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
        const response = await fetch(`${this.baseUrl}/fetch-products?page=1&pageSize=999999`);
        return await this.handleResponse<Product[]>(response);
    }

    async getProductPerPage(page: number, pageSize: number): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/fetch-products?page=${page}&pageSize=${pageSize}`);
        return await this.handleResponse<Product[]>(response);
    }

    async getBundleById(productId: number): Promise<Product | null> {
        const response = await fetch(`${this.baseUrl}/fetch-bundle-product/${productId}`);
        return await this.handleResponse<Product>(response);
    }

    async getBundleLine(productId: number): Promise<BundleLineDTO | null> {
        const response = await fetch(`${this.baseUrl}/fetch-bundleLine/${productId}`);
        return await this.handleResponseBundle<BundleLineDTO>(response);
    }

}