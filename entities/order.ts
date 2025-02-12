import Status from "@/enums/status";
import { Customer } from "./customers";
import PaymentMethod from "./payment-method";
import PaymentStatus from "@/enums/payment-status";
import { Cart } from "./cart";
import { OrderType } from "./order-type";

export interface Order{
    id: number;
    referenceNo: number;
    orderType: OrderType; //this is user defined, can be anything
    customer: Customer; //can be 'walk in'
    transactionDate: Date;
    total: number;
    orderStatus: PaymentStatus;
    fulfillmentStatus: Status;
    remarks: string;
    deliveryAddress: string; //can be 'pickup'
    cart: Cart;
    handledBy: string;
}