import { convertReceivedDeliveryToDeliveryLines, DeliveryLineDTO } from "@/src/Infrastructure/adapter/received-delivery-adapter";
import app from "@/app.json";
import { useApiConfig } from "@/src/shared/lib/api/api-config-context";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { deliveryLinesToReceivedDelivery, deliveryLineToReceivedItem } from "@/src/Infrastructure/adapter/received-delivery-adapter";

export interface IDeliveryLineRepository {
    createDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery>;
    getReceivedDeliveryByDeliveryId(deliveryId: number): Promise<ReceivedDelivery>;
    getReceivedItemById(receivedItemId: number): Promise<ReceivedItem>;
    updateDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery>;
    deleteDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery>;
}

export class DeliveryLineRepository implements IDeliveryLineRepository {
    private baseUrl: string;

    constructor() {

        const { getApiUrl, hasApiUrl } = useApiConfig();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Deliveryline';
        }
        else{
            this.baseUrl = app.api.main + '/Deliveryline';
        }
    }

    async createDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery> {
        try{
            const deliveryLines = convertReceivedDeliveryToDeliveryLines(receivedDelivery);
            console.log('Sending deliveryLines:', deliveryLines); // Log what we're sending

            const response = await fetch(this.baseUrl+`/bulk-save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deliveryLines)
            });

            console.log('Response status:', response.status); // Log response status

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData); // Log the actual response

            const createdDeliveryLines = await deliveryLinesToReceivedDelivery(responseData);

            return createdDeliveryLines;
        } catch (error) {
            console.error('Error creating delivery lines:', error);
            throw error;
        }
    }

    async getReceivedDeliveryByDeliveryId(deliveryId: number): Promise<ReceivedDelivery> {
        try {
            const response = await fetch(this.baseUrl + `/fetch-deliverylines/${deliveryId}`);

            console.log('Response status get received delivery repository:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            const filteredData = responseData.filter((deliveryLine: any) => !deliveryLine.isDeleted);

            const receivedDelivery = await deliveryLinesToReceivedDelivery(filteredData);

            return receivedDelivery;
        } catch (error) {
            console.error('Error in get received delivery by id repo:', error);
            throw error;
        }
    }

    async getReceivedItemById(receivedItemId: number): Promise<ReceivedItem> {
        try {
            const response = await fetch(this.baseUrl + `/fetch-deliveryline/${receivedItemId}`);

            console.log('Response status get received item by id repository:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            const receivedItem = await deliveryLineToReceivedItem(responseData);

            return receivedItem;
        } catch (error) {
            console.error('Error in get received item by id repo:', error);
            throw error;
        }
    }

    async updateDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery> {
        try{
            const deliveryLines = convertReceivedDeliveryToDeliveryLines(receivedDelivery);
            console.log('updating deliveryLines from repo:', deliveryLines); // Log what we're sending

            const response = await fetch(this.baseUrl+`/bulk-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deliveryLines)
            });

            console.log('Response status update delivery lines repo:', response.status); // Log response status

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data update delivery line from repo:', responseData); // Log the actual response

            const updatedReceivedDelivery = await deliveryLinesToReceivedDelivery(responseData);

            return updatedReceivedDelivery;
        } catch (error) {
            console.error('Error updating delivery lines:', error);
            throw error;
        }
    }

    async deleteDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<ReceivedDelivery> {
        try{
            const deliveryLines = convertReceivedDeliveryToDeliveryLines(receivedDelivery);
            console.log('deleting deliveryLines from repo:', deliveryLines); // Log what we're sending

            const response = await fetch(this.baseUrl+`/bulk-delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deliveryLines)
            });

            console.log('Response status delete delivery lines repo:', response.status); // Log response status

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data delete delivery line from repo:', responseData); // Log the actual response

            const deletedReceivedDelivery = await deliveryLinesToReceivedDelivery(responseData);

            return deletedReceivedDelivery;
        } catch (error) {
            console.error('Error deleting delivery lines:', error);
            throw error;
        }
    }
}


