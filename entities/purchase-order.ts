import { Delivery } from './delivery';

export interface PurchaseOrder {
    id: number;
    remarks: string;
    delivery: Delivery;
}