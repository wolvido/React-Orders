// import { ReceivedDelivery } from "./received-delivery";
import { Supplier } from "./supplier";

export interface Delivery {
    id: number; 

    receiptNumber: string; //delivery receipt
    supplier: Supplier
    deliveryDate: Date;
    deliveredBy: string;
    //receivedItems: ReceivedDelivery;
    total: number; //total
    handledBy: string;

    creationDate: Date;
}