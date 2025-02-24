import { OrderAdapter } from "@/adapter/order-adapter";
import { Order } from "@/entities/order";
import app from "@/app.json";
import { useApi } from "@/context/dev-mode-context";

export interface IOrderRepository {
    getById(id: number): Promise<Order | null>;
    getAll(): Promise<Order[]>;
    // getAllCustomers(): Promise<Customer[]>;

    create(order: Omit<Order, 'id'>): Promise<{orderId: number}>;
}

export class OrderRepository implements IOrderRepository {
    private baseUrl: string;

    constructor() {

        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Order';
        }
        else{
            this.baseUrl = app.api.main + '/Order';
        }
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

    async getAll(): Promise<Order[]> {
        console.log('from repository-Fetching orders...');
        try{
            const response = await fetch(`${this.baseUrl}/fetch-orders?page=1&pageSize=999999`);
            if (!response.ok) {
                console.log('response not ok');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('response ok');
            

            const data = await this.handleResponse<Order[]>(response);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.log('Error in getAll:');
            throw new Error(`Failed to fetch orders: ${errorMessage}`);
        }
    }

    async getById(id: number): Promise<Order | null> {
        const response = await fetch(`${this.baseUrl}/fetch-order/${id}`);
        return this.handleResponse<Order>(response);
    }

    // async getAllCustomers(): Promise<Customer[]> {
    //     const response = await fetch(`${this.baseUrl}/fetch-customers`);
    //     return await this.handleResponseCustomers<Customer[]>(response);
    // }

    async create(order: Omit<Order, 'id'>): Promise<{orderId: number}> {
        // Convert the order to DTO format before sending
        const orderDto = OrderAdapter.reverse(order as Order);
        
        const response = await fetch(this.baseUrl+'/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDto)
        });

        console.log('Response status:', response.status)

        return await response.json();
    }
}
