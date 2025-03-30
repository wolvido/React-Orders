import { OrderAdapter } from "@/src/Infrastructure/adapter/order-adapter";
import { Order } from "@/src/entities/order/type/order";
import app from "@/app.json";
import { useApiConfig } from "@/src/shared/lib/api/api-config-context";

export interface IOrderRepository {
    getById(id: number): Promise<Order | null>;
    getAll(): Promise<Order[]>;
    update(order: Order): Promise<void>;
    create(order: Omit<Order, 'id'>): Promise<{orderId: number}>;
}

export class OrderRepository implements IOrderRepository {
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApiConfig();

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

    async update(order: Order): Promise<void> {
        const oldOrder = await fetch(`${this.baseUrl}/fetch-order/${order.id}`);
        const oldOrderData = await oldOrder.json();

        const orderDto = OrderAdapter.reverse(order);

        orderDto.sys_CreateTimeStamp = oldOrderData.sys_CreateTimeStamp;

        const response = await fetch(this.baseUrl+'/update/'+order.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDto)
        });

        console.log('Order Update response status:', response.status)
    }

    async create(order: Omit<Order, 'id'>): Promise<{orderId: number}> {
        // Convert the order to DTO format before sending

        const orderDto = OrderAdapter.reverse(order as Order);

        console.log('Order DTO from repo:', orderDto);

        orderDto.restaurantOrderId = 0;
        
        const response = await fetch(this.baseUrl+'/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDto)
        });

        console.log('Create Order Response status:', response.status)

        return await response.json();
    }


}
