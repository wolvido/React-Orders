import { convertCartToOrderLines, convertOrderLinesToCart, RestaurantOrderLineDTO } from "@/adapter/cart-adapter";
import app from "@/app.json";
import { Cart } from "@/entities/cart";
import { ProductRepository } from "./product-repository";
import { useApi } from "@/context/dev-mode-context";

export interface IOrderLineRepository {
    createOrderLines(cart: Cart): Promise<RestaurantOrderLineDTO[]>;
    updateOrderLines(cart: Cart): Promise<void>;
    getCart(orderId: number): Promise<Cart>;
}

export class OrderLineRepository implements IOrderLineRepository {
    private baseUrl: string;

    productRepository = new ProductRepository();

    constructor() {

        const { getApiUrl, hasApiUrl } = useApi();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/OrderLine';
        }
        else {
            this.baseUrl = app.api.main + '/OrderLine';
        }
    }

    async getCart(orderId: number): Promise<Cart> {
        try {
            const response = await fetch(this.baseUrl+`/fetch-orderlines/${orderId}`);
    
            console.log('Response status:', response.status); // Log response status
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            
            //filter out deleted items
            const filteredData = responseData.filter((orderLine: any) => !orderLine.isDeleted);
            console.log('orderline filtered response data:', filteredData);
    
            const cart = await convertOrderLinesToCart(filteredData);

            return cart;

        } catch (error) {
            console.error('Error in getCart:', error);
            throw error;
        }
    }

    async createOrderLines(cart: Cart): Promise<RestaurantOrderLineDTO[]> {
        try {
            const orderLines = convertCartToOrderLines(cart);

            //for every cart item, set id to 0
            orderLines.forEach((orderLine) => {
                orderLine.restaurantOrderLineId = 0;
            });

            console.log('Sending orderLines:', orderLines); // Log what we're sending
    
            const response = await fetch(this.baseUrl+`/bulk-save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderLines)
            });
    
            console.log('Response status:', response.status); // Log response status
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log('Response data:', responseData); // Log the actual response
    
            return responseData;
        } catch (error) {
            console.error('Error in createOrderLines:', error);
            throw error;
        }
    }

    async updateOrderLines(cart: Cart): Promise<void> {
        try {
            const existingOrderLines =  await fetch(this.baseUrl+`/fetch-orderlines/${cart.orderId}`);
            const existingOrderLinesData = await existingOrderLines.json();

            const orderLines = convertCartToOrderLines(cart);

            //for every order lines, set created date to existing order lines created date
            orderLines.forEach((orderLine) => {
                const existingOrderLine = existingOrderLinesData.find((existingOrderLine: any) => existingOrderLine.productId === orderLine.productId);
                if (existingOrderLine) {
                    orderLine.sys_CreateTimeStamp = existingOrderLine.sys_CreateTimeStamp;     
                } else {
                    console.error('existing order line not found for product:', orderLine.productId);
                }
            });

            console.log('Sending update orderLines:', orderLines);
            console.log('sending sample orderLine:', orderLines[0]);
    
            const response = await fetch(this.baseUrl+`/bulk-update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderLines)
            });
    
            console.log('Response status:', response.status); // Log response status
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log('Update OrderLine Response:', responseData); // Log the actual response
    
        } catch (error) {
            console.error('Error in updateOrderLines:', error);
            throw error;
        }
    }

    async deleteOrderLines(cart: Cart): Promise<void> {
        //same thing as update but set isDeleted to true
        try {
            const orderLines = convertCartToOrderLines(cart);

            //for every order lines, set isDeleted to true and sys deleted timestamp to now
            orderLines.forEach((orderLine) => {
                orderLine.isDeleted = true;
                orderLine.sys_DeletedTimeStamp = new Date().toISOString();
            });

            console.log('Sending delete orderLines:', orderLines);

            const response = await fetch(this.baseUrl+`/bulk-update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderLines)
            });

            console.log('deleted order lines response status:', response.status); // Log response status

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Delete OrderLine response:', responseData);

        } catch (error) {
            console.error('Error in deleteOrderLines:', error);
            throw error;
        };
    }

}