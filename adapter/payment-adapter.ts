import {CashPayment, ChequePayment, BankTransferPayment, PaymentGateway }from "@/entities/payment-method";

export interface PaymentDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string; // ISO format timestamp
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    globalPaymentId: number;
    amount: number;
    balance: number;
    change: number;
    receivedBy: string;
    paidBy: string;
    customerId: number;
    paymentDate: string; // ISO format timestamp
    paymentType: string;
    cashierShiftId: number;
    referenceNumber: string;
    approvalCode: string;
    bankName: string;
    paymentService: string;
    confirmed: boolean;
    confirmedBy: string;
    confirmationDate: string; // ISO format timestamp
    remarks: string;
    paymentStatus: string;
    orderId: number;
    bookingId: number;
    paymentConfirmationId: number;
    payableId: number;
    receivableId: number;
}

export function convertCashPaymentToPaymentDTO(cashPayment: CashPayment): PaymentDTO {
    return {
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "system",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "system",
        sys_DeletedTimeStamp: "",
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        globalPaymentId: cashPayment.id,
        amount: cashPayment.cashTendered,
        balance: cashPayment.balance,
        change: cashPayment.changeDue,
        receivedBy: "",
        paidBy: "",
        customerId: 0,
        paymentDate: new Date().toISOString(),
        paymentType: "Cash",
        cashierShiftId: 0,
        referenceNumber: "",
        approvalCode: "",
        bankName: "",
        paymentService: "",
        confirmed: false,
        confirmedBy: "",
        confirmationDate: "",
        remarks: "",
        paymentStatus: "",
        orderId: cashPayment.orderId,
        bookingId: 0,
        paymentConfirmationId: 0,
        payableId: 0,
        receivableId: 0
    };

}

export function convertChequePaymentToPaymentDTO(chequePayment: ChequePayment): PaymentDTO {
    return {
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "system",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "system",
        sys_DeletedTimeStamp: "",
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        globalPaymentId: chequePayment.id,
        amount: chequePayment.payment,
        balance: chequePayment.balance,
        change: 0,
        receivedBy: "",
        paidBy: "",
        customerId: 0,
        paymentDate: new Date().toISOString(),
        paymentType: "Cheque",
        cashierShiftId: 0,
        referenceNumber: chequePayment.chequeNumber,
        approvalCode: "",
        bankName: chequePayment.bankName,
        paymentService: "",
        confirmed: false,
        confirmedBy: "",
        confirmationDate: "",
        remarks: chequePayment.remark,
        paymentStatus: "",
        orderId: chequePayment.orderId,
        bookingId: 0,
        paymentConfirmationId: 0,
        payableId: 0,
        receivableId: 0
    };
}

export function convertBankTransferPaymentToPaymentDTO(bankTransferPayment: BankTransferPayment): PaymentDTO {
    return {
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "system",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "system",
        sys_DeletedTimeStamp: "",
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        globalPaymentId: bankTransferPayment.id,
        amount: bankTransferPayment.payment,
        balance: bankTransferPayment.balance,
        change: 0,
        receivedBy: "",
        paidBy: "",
        customerId: 0,
        paymentDate: new Date().toISOString(),
        paymentType: "Bank Transfer",
        cashierShiftId: 0,
        referenceNumber: "",
        approvalCode: "",
        bankName: bankTransferPayment.bankName,
        paymentService: "",
        confirmed: false,
        confirmedBy: "",
        confirmationDate: "",
        remarks: "",
        paymentStatus: "",
        orderId: bankTransferPayment.orderId,
        bookingId: 0,
        paymentConfirmationId: 0,
        payableId: 0,
        receivableId: 0
    };
}

export function convertPaymentGatewayToPaymentDTO(paymentGateway: PaymentGateway): PaymentDTO {
    return {
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "system",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "system",
        sys_DeletedTimeStamp: "",
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        globalPaymentId: paymentGateway.id,
        amount: paymentGateway.payment,
        balance: paymentGateway.balance,
        change: 0,
        receivedBy: "",
        paidBy: "",
        customerId: 0,
        paymentDate: new Date().toISOString(),
        paymentType: "Payment Gateway",
        cashierShiftId: 0,
        referenceNumber: "",
        approvalCode: "",
        bankName: "",
        paymentService: paymentGateway.paymentProvider,
        confirmed: false,
        confirmedBy: "",
        confirmationDate: "",
        remarks: "",
        paymentStatus: "",
        orderId: paymentGateway.orderId,
        bookingId: 0,
        paymentConfirmationId: 0,
        payableId: 0,
        receivableId: 0
    };
}