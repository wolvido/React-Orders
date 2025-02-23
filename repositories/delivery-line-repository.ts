import { convertReceivedDeliveryToDeliveryLines, DeliveryLineDTO } from "@/adapter/received-delivery-adapter";
import app from "@/app.json";
import { useApi } from "@/context/dev-mode-context";
import { ReceivedDelivery } from "@/entities/received-delivery";

export interface IDeliveryLineRepository {
    createDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<DeliveryLineDTO[]>;
}

export class DeliveryLineRepository implements IDeliveryLineRepository {
    private baseUrl: string;

    constructor() {

        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Deliveryline';
        }
        else{
            this.baseUrl = app.api.main + '/Deliveryline';
        }
    }

    async createDeliveryLines(receivedDelivery: ReceivedDelivery): Promise<DeliveryLineDTO[]> {
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

            return responseData;
        } catch (error) {
            console.error('Error creating delivery lines:', error);
            throw error;
        }
    }
}


