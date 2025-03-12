import Status from "@/enums/status";
import { Customer } from "@/shared/entities/customers";
import PaymentStatus from "@/enums/payment-status";

export interface Order{
    id: number;
    //referenceNo: number;
    orderType: string; //this is user defined, can be anything
    customer: Customer; //can be 'walk in'
    transactionDate: Date;

    balance: number; //is the remaining balance
    total: number; //is the total cost

    orderStatus: PaymentStatus;
    fulfillmentStatus: Status;
    remarks: string;
    deliveryAddress: string; //can be 'pickup'
    //cart: Cart;
    handledBy: string;

    isPaid: boolean;
    isComplete: boolean;
}