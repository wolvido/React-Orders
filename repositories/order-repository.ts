import { OrderAdapter } from "@/adapter/order-adapter";
import { Order } from "@/entities/order";
import { Customer } from "@/entities/customers";
import PaymentStatus from "@/enums/payment-status";
import Status from "@/enums/status";
import app from "@/app.json";
import { CustomerAdapter } from "@/adapter/customer-adapter";

export interface IOrderRepository {
    getById(id: number): Promise<Order | null>;
    getAll(): Promise<Order[]>;
    getAllCustomers(): Promise<Customer[]>;

    create(order: Omit<Order, 'id'>): Promise<Order>;
    // update(id: number, order: Partial<Order>): Promise<Order>;
    // delete(id: number): Promise<boolean>;
    // getByCustomerId(customerId: number): Promise<Order[]>;
    // getByStatus(status: Status): Promise<Order[]>;
    // getByPaymentStatus(status: PaymentStatus): Promise<Order[]>;
    // updateFulfillmentStatus(id: number, status: Status): Promise<Order>;
    // updatePaymentStatus(id: number, status: PaymentStatus): Promise<Order>;
}

export class OrderRepository implements IOrderRepository {
    private baseUrl: string;

    constructor() {
        this.baseUrl = app.api.baseUrl + '/Order';
    }

    //response handler
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        //check if data is an array
        if (Array.isArray(data)) {
            const orders = data.map((order: any) => OrderAdapter.adapt(order));
            return await orders as T;
        }
        
        return await OrderAdapter.adapt(data) as T;
    }

    private async handleResponseCustomers<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        //check if data is an array
        if (Array.isArray(data)) {
            const customers = data.map((customer: any) => CustomerAdapter.adapt(customer));
            return await customers as T;
        }
        
        return await CustomerAdapter.adapt(data) as T;
    }

    async getAll(): Promise<Order[]> {
        const response = await fetch(`${this.baseUrl}/fetch-orders?page=1&pageSize=999999`);
        return await this.handleResponse<Order[]>(response);
    }

    async getById(id: number): Promise<Order | null> {
        const response = await fetch(`${this.baseUrl}/fetch-order/${id}`);
        return this.handleResponse<Order>(response);
    }

    async getAllCustomers(): Promise<Customer[]> {
        const response = await fetch(`${this.baseUrl}/fetch-customers`);
        return await this.handleResponseCustomers<Customer[]>(response);
    }

    async create(order: Omit<Order, 'id'>): Promise<Order> {
        // Convert the order to DTO format before sending
        const orderDto = OrderAdapter.reverse(order as Order);

        console.log('Order DTO:', orderDto);
        
        const response = await fetch(this.baseUrl+'/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDto)
        });
        return await this.handleResponse<Order>(response);
    }

    // async update(id: number, orderData: Partial<Order>): Promise<Order> {
    //     const response = await fetch(`${this.baseUrl}/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(orderData)
    //     });
    //     return await this.handleResponse<Order>(response);
    // }

    // async delete(id: number): Promise<boolean> {
    //     const response = await fetch(`${this.baseUrl}/${id}`, {
    //         method: 'DELETE'
    //     });
    //     return response.ok;
    // }

    // async getByCustomerId(customerId: number): Promise<Order[]> {
    //     const response = await fetch(`${this.baseUrl}/customer/${customerId}`);
    //     return await this.handleResponse<Order[]>(response);
    // }

    // async getByStatus(status: Status): Promise<Order[]> {
    //     const response = await fetch(`${this.baseUrl}/status/${status}`);
    //     return await this.handleResponse<Order[]>(response);
    // }

    // async getByPaymentStatus(status: PaymentStatus): Promise<Order[]> {
    //     const response = await fetch(`${this.baseUrl}/payment-status/${status}`);
    //     return await this.handleResponse<Order[]>(response);
    // }

    // async updateFulfillmentStatus(id: number, status: Status): Promise<Order> {
    //     const response = await fetch(`${this.baseUrl}/${id}/fulfillment-status`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ status })
    //     });
    //     return await this.handleResponse<Order>(response);
    // }

    // async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Order> {
    //     const response = await fetch(`${this.baseUrl}/${id}/payment-status`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ status })
    //     });
    //     return await this.handleResponse<Order>(response);
    // }
}
