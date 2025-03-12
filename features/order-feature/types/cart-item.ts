import { Product } from '@/shared/entities/product';

export interface CartItem{ //aka orderline
    id: number;
    product: Product;
    quantity: number;
    total: number;
}