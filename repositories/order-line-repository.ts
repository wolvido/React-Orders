import { convertCartToOrderLines, convertOrderLinesToCart, RestaurantOrderLineDTO } from "@/adapter/cart-adapter";
import app from "@/app.json";
import { Cart } from "@/entities/cart";
import { ProductRepository } from "./product-repository";

export interface IOrderLineRepository {
    createOrderLines(cart: Cart): Promise<RestaurantOrderLineDTO[]>;
}

export class OrderLineRepository implements IOrderLineRepository {
    private baseUrl: string;

    productRepository = new ProductRepository();

    constructor() {
        //this.baseUrl = app.api.mlangUrl + '/OrderLine';
        this.baseUrl = app.api.main + '/OrderLine';
    }

    async getCart(orderId: number): Promise<Cart> {
        try {
            const response = await fetch(this.baseUrl+`/fetch-orderlines/${orderId}`);
    
            console.log('Response status:', response.status); // Log response status
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log('Response data:', responseData); // Log the actual response
    
            const cart = await convertOrderLinesToCart(responseData);

            return cart;

        } catch (error) {
            console.error('Error in getCart:', error);
            throw error;
        }
    }

    async createOrderLines(cart: Cart): Promise<RestaurantOrderLineDTO[]> {
        try {
            const orderLines = convertCartToOrderLines(cart);
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
}