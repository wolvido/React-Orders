import { ReceivedDelivery } from "./received-delivery";
import { Supplier } from "./supplier";

export interface Delivery {
    receiptNumber: string;
    dueDate: Date;
    id: number;
    supplier: Supplier
    deliveryDate: Date;
    deliveredBy: string;
    receivedItems: ReceivedDelivery;
    total: number;

    
}