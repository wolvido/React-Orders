import { Product } from "./product";

export interface PurchaseOrderLine {
    id: number;
    purchaseOrderId: number;
    productId: number;
    product?: Product;

    basePrice: number;
    percentageDiscount: number;
    flatDiscount: number;
    totalPrice: number;

    noofOrdersToArrive: number; 
        // lets not bother with this for now, just let it pass around

    orderedQuantity?: number;
    receivedQuantity?: number;

    /**
     *  if the item has been received but not yet delivered.
     */
    isReceived: boolean;

    /**
     *  if the item has been delivered
     */
    isProcessed: boolean;

    creationDate?: Date;

    /**
     * @string 'Product' or 'RawMaterial'
     */
    itemType: string;

}
  