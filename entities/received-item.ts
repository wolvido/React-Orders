import { Product } from '@/entities/product';

export interface ReceivedItem { //aka delivery line
    product: Product;
    quantity: number;
    total: number;
    manualPrice?: number;
}