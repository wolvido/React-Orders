import { Supplier } from "@/src/entities/supplier/type/supplier";
import app from "@/app.json";
import { SupplierAdapter } from "@/src/Infrastructure/adapter/supplier-adapter";
import { DeliveryAdapter, DeliveryDTO } from "@/src/Infrastructure/adapter/delivery-adapter";
import { Delivery } from "@/src/entities/delivery/type/delivery";
import { useApi } from "@/src/services/dev-mode-service/context/dev-mode-context";

export interface IDeliveryRepository {
    getAllSuppliers(): Promise<Supplier[]>;
    createDelivery(delivery: Delivery): Promise<any>;
    updateDelivery(delivery: Delivery): Promise<Delivery>;
    getDeliveryById(id: number): Promise<Delivery>;
}

export class DeliveryRepository implements IDeliveryRepository{
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Delivery';
        }
        else{
            this.baseUrl = app.api.main + '/Delivery';
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
            const deliveries = data.map((delivery: any) => DeliveryAdapter.adapt(delivery));
            return await deliveries as T;
        }
        return await DeliveryAdapter.adapt(data) as T;
    }

    private async handleSupplierResponse<T>(response: Response): Promise<T> { 
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        //check if data is an array
        if (Array.isArray(data)) {
            const suppliers = data.map((supplier: any) => SupplierAdapter.adapt(supplier));
            return await suppliers as T;
        }
        return await SupplierAdapter.adapt(data) as T;
    }

    async getAllSuppliers(): Promise<Supplier[]> {
        const response = await fetch(this.baseUrl+ '/fetch-suppliers');
        return await this.handleSupplierResponse<Supplier[]>(response);
    }

    createDelivery(delivery: Delivery): Promise<{deliveryId: number}> {
        const deliveryDto = DeliveryAdapter.adaptToDTO(delivery);

        console.log('create delivery from repository DTO:', deliveryDto);

        return fetch(this.baseUrl + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deliveryDto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create delivery');
            }
            return response.json();
        })
        .then(data => {
            return {deliveryId: data.deliveryId};
        });
    }

    async updateDelivery(delivery: Delivery): Promise<Delivery> {
        const existingDelivery = await fetch(this.baseUrl + '/fetch-delivery/' + delivery.id)
        const existingDeliveryData = await existingDelivery.json();

        const deliveryDto = DeliveryAdapter.adaptToDTO(delivery);

        deliveryDto.sys_CreateTimeStamp = existingDeliveryData.sys_CreateTimeStamp;

        const response = await fetch(this.baseUrl + '/update/' + delivery.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deliveryDto)
        });

        console.log('Delivery Update response status:', response.status)
        console.log('Delivery Update response repository:', response)

        return await this.handleResponse<Delivery>(response);
    }

    async getDeliveryById(id: number): Promise<Delivery> {
        const response = await fetch(this.baseUrl + '/fetch-delivery/' + id);
        return await this.handleResponse<Delivery>(response);
    }
}