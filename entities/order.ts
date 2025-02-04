import Status from "@/enums/status";
import { Customer } from "./customers";
import PaymentMethod from "./payment-method";
import PaymentStatus from "@/enums/payment-status";
import { Cart } from "./cart";

export interface Order{
    id: number;
    orderType: PaymentMethod;
    customer: Customer;
    transactionDate: Date;
    total: number;
    orderStatus: PaymentStatus;
    fulfillmentStatus: Status;
    remarks: string;
    deliveryAddress: string; //can be 'pickup'
    cart: Cart;
}