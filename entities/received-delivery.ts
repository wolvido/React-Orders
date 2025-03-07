import { ReceivedItem } from "./received-item";

export interface ReceivedDelivery{ 
    total: number;
    items: ReceivedItem[];
    deliveryId: number;
    deliveredBy: string;
}