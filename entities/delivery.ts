import { ReceivedDelivery } from "./received-delivery";
import { Supplier } from "./supplier";

export interface Delivery {
    id: number;
    receiptNumber: string;
    dueDate: Date;
    supplier: Supplier
    deliveryDate: Date;
    deliveredBy: string;
    receivedItems: ReceivedDelivery;
    total: number; //total cost
}