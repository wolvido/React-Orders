import { ReceivedItem } from "../../received-item/type/received-item";

/***
 * aka delivery cart
 */
export interface ReceivedDelivery{
    total: number;
    items: ReceivedItem[];
    deliveryId: number;
    deliveredBy: string;
}