import { Product } from './product';

export interface ReceivedItem { //aka delivery line
    product: Product;
    quantity: number;
    total: number;
}