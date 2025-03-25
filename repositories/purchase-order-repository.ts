import { PurchaseOrder } from "@/entities/purchase-order";
import { useApi } from "@/services/dev-mode-service/context/dev-mode-context";
import { PurchaseOrderToDTO, PurchaseOrderDTOToEntity } from "@/adapter/purchase-order-adapter";
import app from "@/app.json";

export interface IPurchaseOrderRepository {
    getAll(): Promise<PurchaseOrder[]>;
    update(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;
    getById(id: number): Promise<PurchaseOrder | null>;
}

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/PurchaseOrder';
        }
        else {
            this.baseUrl = app.api.main + '/PurchaseOrder';
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

        if (Array.isArray(data)) {
            const purchaseOrders = data.map((purchaseOrder: any) => PurchaseOrderDTOToEntity(purchaseOrder));
            return await purchaseOrders as T;
        }

        return await PurchaseOrderToDTO(data) as T;
    };

    async getAll(): Promise<PurchaseOrder[]> {
        console.log('from repository-Fetching purchase orders...');
        try {
            const response = await fetch(`${this.baseUrl}/fetch-purchase-orders?page=1&pageSize=999999`);
            if (!response.ok) {
                console.warn('response not ok on get all PO repo');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('response ok on get all PO repo');

            const data = await this.handleResponse<PurchaseOrder[]>(response);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to fetch purchase orders on repo' + errorMessage);
        }
    }

    async update(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
        const purchaseOrderDTO = PurchaseOrderToDTO(purchaseOrder);

        try {
            const response = await fetch(`${this.baseUrl}/update/${purchaseOrder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(purchaseOrderDTO)
            });

            if (!response.ok) {
                throw new Error(`HTTP error on update PO repo! status: ${response.status}`);
            }
            else {
                console.log('response ok on update PO repo');
            }

            const data = await this.handleResponse<PurchaseOrder>(response);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to update purchase order on repo' + errorMessage);
        }
    }

    async getById(id: number): Promise<PurchaseOrder | null> {
        try {
            const response = await fetch(`${this.baseUrl}/fetch-purchase-orders/${id}`);
            return this.handleResponse<PurchaseOrder>(response);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            throw new Error('Failed to fetch purchase order by id on repo' + errorMessage);
        }
    }
}

