import { ProductSchema } from "@/shared/entities/product-schema";
import app from "@/app.json";
import { useApi } from "@/shared/context/dev-mode-context";
import { toProductSchema } from "@/adapter/product-schema-adapter";

export interface IProductSchemaRepository {
    getAll(): Promise<ProductSchema[]>;
    // getById(id: number): Promise<ProductSchema | null>;
    // create(productSchema: ProductSchema): Promise<ProductSchema>;
    // update(productSchema: ProductSchema): Promise<ProductSchema>;
    // delete(id: number): Promise<boolean>;
}

export class ProductSchemaRepository implements IProductSchemaRepository {
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/ProductSchema';
        }
        else{
            this.baseUrl = app.api.main + '/ProductSchema';
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
            const productSchemas = data.map((productSchema: any) => toProductSchema(productSchema));
            return await productSchemas as T;
        }

        return await toProductSchema(data) as T;
    }

    async getAll(): Promise<ProductSchema[]> {
        // const response = await fetch(this.baseUrl+"/fetch-all");
        // return this.handleResponse<ProductSchema[]>(response);

        try {
            const response = await fetch(`${this.baseUrl}/fetch-all`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('product schema repository get all response ok');
            const data = await this.handleResponse<ProductSchema[]>(response);
            return data;
        }
        catch (err) {
            console.error('Error fetching product schemas:', err);
            throw err;
        }
    }
}