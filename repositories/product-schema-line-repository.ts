import { useApi } from "@/shared/context/dev-mode-context";
import { ProductSchemaLine } from "@/shared/entities/product-schema-line";
import app from "@/app.json";
import { toProductSchemaLine } from "@/adapter/product-schemaline-adapter";

export interface IProductSchemaLineRepository {
    getSchemaLinesBySchemaId(schemaId: number): Promise<ProductSchemaLine[]>;
}

export class ProductSchemaLineRepository implements IProductSchemaLineRepository {
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/ProductSchemaline';
        }
        else{
            this.baseUrl = app.api.main + '/ProductSchemaline';
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
            const productSchemalines = data.map((productSchemaline: any) => toProductSchemaLine(productSchemaline));
            return await productSchemalines as T;
        }

        return await toProductSchemaLine(data) as T;
    }

    async getSchemaLinesBySchemaId(schemaId: number): Promise<ProductSchemaLine[]> {
        try {
            const response = await fetch(`${this.baseUrl}/fetch-product-schemalines/${schemaId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('product schema line repository get all response ok');
            const data = await this.handleResponse<ProductSchemaLine[]>(response);
            return data;
        }
        catch (err) {
            console.log('product schema line repository get all error', err);
            throw new Error('Failed to fetch product schema lines');
        }
    }


}