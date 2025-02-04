import { Order } from "@/entities/order";
import PaymentStatus from "@/enums/payment-status";
import Status from "@/enums/status";

export interface IOrderRepository {
    getById(id: number): Promise<Order | null>;
    getAll(): Promise<Order[]>;
    create(order: Omit<Order, 'id'>): Promise<Order>;
    update(id: number, order: Partial<Order>): Promise<Order>;
    delete(id: number): Promise<boolean>;
    getByCustomerId(customerId: number): Promise<Order[]>;
    getByStatus(status: Status): Promise<Order[]>;
    getByPaymentStatus(status: PaymentStatus): Promise<Order[]>;
    updateFulfillmentStatus(id: number, status: Status): Promise<Order>;
    updatePaymentStatus(id: number, status: PaymentStatus): Promise<Order>;
}


export class OrderRepository implements IOrderRepository {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://localhost:7215/api/orders';
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }
        return await response.json();
    }

    async getById(id: number): Promise<Order | null> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        return this.handleResponse<Order>(response);
    }

    async getAll(): Promise<Order[]> {
        const response = await fetch(this.baseUrl);
        return this.handleResponse<Order[]>(response);
    }

    async create(order: Omit<Order, 'id'>): Promise<Order> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });
        return this.handleResponse<Order>(response);
    }

    async update(id: number, orderData: Partial<Order>): Promise<Order> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        return this.handleResponse<Order>(response);
    }

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }

    async getByCustomerId(customerId: number): Promise<Order[]> {
        const response = await fetch(`${this.baseUrl}/customer/${customerId}`);
        return this.handleResponse<Order[]>(response);
    }

    async getByStatus(status: Status): Promise<Order[]> {
        const response = await fetch(`${this.baseUrl}/status/${status}`);
        return this.handleResponse<Order[]>(response);
    }

    async getByPaymentStatus(status: PaymentStatus): Promise<Order[]> {
        const response = await fetch(`${this.baseUrl}/payment-status/${status}`);
        return this.handleResponse<Order[]>(response);
    }

    async updateFulfillmentStatus(id: number, status: Status): Promise<Order> {
        const response = await fetch(`${this.baseUrl}/${id}/fulfillment-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
        return this.handleResponse<Order>(response);
    }

    async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Order> {
        const response = await fetch(`${this.baseUrl}/${id}/payment-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
        return this.handleResponse<Order>(response);
    }
}
