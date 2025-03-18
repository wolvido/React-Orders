import { Delivery } from './delivery';
import Status from '@/shared/enums/status'
import PaymentStatus from '@/shared/enums/payment-status';

export interface PurchaseOrder {
    id: number;
    remarks: string;
    transactionDate: Date;
    preparedBy: string,
    delivery: Delivery;
    status: Status;
    paymentStatus: PaymentStatus;
}