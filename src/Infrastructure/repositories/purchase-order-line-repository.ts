import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { useApiConfig } from "@/src/shared/lib/api/api-config-context";
import {PurchaseOrderLineDTOtoEntity, PurchaseOrderLinetoDTO} from "@/src/infrastructure/adapter/purchase-orderline-adapter";
import app from "@/app.json";

export interface IPurchaseOrderLineRepository {
    getByPoId(poLineId: number): Promise<PurchaseOrderLine | null>;
    updatePoLine(poLine: PurchaseOrderLine): Promise<PurchaseOrderLine>;
    deletePoLine(poLineId: number): Promise<PurchaseOrderLine>;
}

export class PurchaseOrderLineRepository implements IPurchaseOrderLineRepository{
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApiConfig();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/PurchaseOrderline';
        }
        else{
            this.baseUrl = app.api.main + '/PurchaseOrderline';
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
            const poLines = data.map((poLine: any) => PurchaseOrderLineDTOtoEntity(poLine));
            return await poLines as T;
        }

        return await PurchaseOrderLineDTOtoEntity(data) as T;
    }

    async getByPoId(poLineId: number): Promise<PurchaseOrderLine | null> {
        try{
            const response = await fetch(`${this.baseUrl}/fetch-purchaseOrderline/${poLineId}`);
            if (!response.ok) {
                console.warn('response not ok on get PO line repo');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await this.handleResponse<PurchaseOrderLine>(response);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to fetch purchase order line on repo' + errorMessage);
        }
    }

    async updatePoLine(poLine: PurchaseOrderLine): Promise<PurchaseOrderLine>{
        const poLineDto = PurchaseOrderLinetoDTO(poLine);

        try {
            const response = await fetch(`${this.baseUrl}/update/${poLine.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(poLineDto)
            });

            if (!response.ok) {
                console.warn('response not ok on update PO line repo');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await this.handleResponse<PurchaseOrderLine>(response);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to update purchase order line on repo: ' + errorMessage);
        }
    }

    async deletePoLine(poLineId: number): Promise<PurchaseOrderLine>{
        try {
            const response = await fetch(`${this.baseUrl}/delete/${poLineId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.warn('response not ok on delete PO line repo');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await this.handleResponse<PurchaseOrderLine>(response);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to delete purchase order line on repo: ' + errorMessage);
        }
    }

}