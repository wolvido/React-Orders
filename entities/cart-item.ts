import { Product } from './product'

export interface CartItem{ //aka orderline
    id: number;
    product: Product;
    quantity: number;
    total: number;
}