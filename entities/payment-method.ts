interface PaymentMethodBase {
    type: string; // Discriminator property
    orderId: number;
}

export interface CashPayment extends PaymentMethodBase {
    type: "Cash";
    id: number;
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
    id: number;
    depositDate: Date;
}

export interface PaymentGateway extends PaymentMethodBase{
    type: "Payment gateway";
    paymentProvider: string; //gcash, maya, etc..
    id: number;
    payment: number;
}
  
  // Union of all payment methods
type PaymentMethod = CashPayment | ChequePayment | BankTransferPayment | PaymentGateway;

export default PaymentMethod;