interface PaymentMethodBase {
    type: string; // Discriminator property
}

interface CashPayment extends PaymentMethodBase {
    type: "Cash";
    amountDue: number; // Total amount to be paid
    cashTendered: number; // Cash given by the customer
    changeDue: number; // Calculated change
}
  
interface ChequePayment extends PaymentMethodBase {
    type: "Cheque";
    chequeNumber: string;
    bankName: string;
    amount: number;
    remark: string;
    chequeDate: Date;
}
  
interface BankTransferPayment extends PaymentMethodBase {
    type: "Bank Transfer";
    amount: number;
    bankName: string;
    id: number;
    depositDate: Date;
}

interface PaymentGateway extends PaymentMethodBase{
    type: "Payment gateway";
    paymentProvider: string; //gcash, maya, etc..
    id: number;
    transactionFee: number;
}
  
  // Union of all payment methods
type PaymentMethod = CashPayment | ChequePayment | BankTransferPayment | PaymentGateway;

export default PaymentMethod;