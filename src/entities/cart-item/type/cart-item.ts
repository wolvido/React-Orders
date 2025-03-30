import { Product } from '../../product/type/product';

export interface CartItem{ //aka orderline
    id: number;
    product: Product;
    quantity: number;
    total: number;
}