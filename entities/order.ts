import Status from "@/enums/status";
import { Customer } from "./customers";
import PaymentMethod from "./payment-method";
import PaymentStatus from "@/enums/payment-status";

export interface order{
    id: number;
    orderType: PaymentMethod;
    customer: Customer;
    transactionDate: Date;
    total: number;
    orderStatus: Status;
    fulfillmentStatus: PaymentStatus;
}