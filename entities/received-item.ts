import { Product } from './product';

export interface ReceivedItem {
    product: Product;
    quantity: number;
    total: number;
}