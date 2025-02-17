interface PaymentMethodBase {
    type: string; // Discriminator property
    orderId: number;
    balance: number;
    id: number;
}

export interface CashPayment extends PaymentMethodBase {
    type: "Cash";
    cashTendered: number;
    changeDue: number; // Calculated change
}
  
export interface ChequePayment extends PaymentMethodBase {
    type: "Cheque";
    chequeNumber: string;
    bankName: string;
    payment: number;
    remark: string;
    chequeDate: Date;
}
  
export interface BankTransferPayment extends PaymentMethodBase {
    type: "Bank Transfer";
    payment: number;
    bankName: string;
    depositDate: Date;
}

export interface PaymentGateway extends PaymentMethodBase{
    type: "Payment Gateway";
    paymentProvider: string; //gcash, maya, etc..
    payment: number;
}
  
  // Union of all payment methods
type PaymentMethod = CashPayment | ChequePayment | BankTransferPayment | PaymentGateway;

export default PaymentMethod;