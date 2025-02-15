import { Product } from './product'

export interface CartItem{ //aka orderline
    product: Product;
    quantity: number;
    total: number;
}