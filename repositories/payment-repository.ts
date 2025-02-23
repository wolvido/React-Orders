import { CashPayment, ChequePayment, PaymentGateway, BankTransferPayment } from "@/entities/payment-method";
import { PaymentDTO } from "@/adapter/payment-adapter";
import { convertBankTransferPaymentToPaymentDTO, convertCashPaymentToPaymentDTO, convertChequePaymentToPaymentDTO, convertPaymentGatewayToPaymentDTO } from "@/adapter/payment-adapter";
import app from "@/app.json";
import { useApi } from "@/context/dev-mode-context";

export interface IPaymentRepository {
    createCashPayment(payment: CashPayment): Promise<{paymentId: number}>;
    createChequePayment(payment: ChequePayment): Promise<{paymentId: number}>;
    createBankTransferPayment(payment: BankTransferPayment): Promise<{paymentId: number}>;
    createPaymentGateway(payment: PaymentGateway): Promise<{paymentId: number}>;
}

export class PaymentRepository implements IPaymentRepository {
    private baseUrl: string;

    constructor() {

        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Payment';
        }else{
            this.baseUrl = app.api.main + '/Payment';
        }
    }

    async createCashPayment(payment: CashPayment): Promise<{paymentId: number}> {
        const paymentDto = convertCashPaymentToPaymentDTO(payment);
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDto)
        });
        return await response.json();
    }

    async createChequePayment(payment: ChequePayment): Promise<{paymentId: number}> {
        const paymentDto = convertChequePaymentToPaymentDTO(payment);
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDto)
        });
        return await response.json();
    }

    async createBankTransferPayment(payment: BankTransferPayment): Promise<{paymentId: number}> {
        const paymentDto = convertBankTransferPaymentToPaymentDTO(payment);
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDto)
        });
        return await response.json();
    }

    async createPaymentGateway(payment: PaymentGateway): Promise<{paymentId: number}> {
        const paymentDto = convertPaymentGatewayToPaymentDTO(payment);
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDto)
        });
        return await response.json();
    }
}
