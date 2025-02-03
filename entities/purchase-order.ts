import { Delivery } from './delivery';
import Status from '@/enums/status'
import PaymentStatus from '@/enums/payment-status';

export interface PurchaseOrder {
    id: number;
    remarks: string;
    transactionDate: Date;
    preparedBy: string,
    delivery: Delivery;
    status: Status;
    paymentStatus: PaymentStatus;
}