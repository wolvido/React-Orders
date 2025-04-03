import { Product } from '../../product/type/product';

/***
 * Represents a received item (aka delivery line) in the system.
 */
export interface ReceivedItem {
    id: number;
    product: Product;
    quantity: number;
    total: number;
    manualPrice?: number;

    discountPercentage?: number;
    discountFlat?: number;
}