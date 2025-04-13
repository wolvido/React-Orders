import { Product } from "../../product/type/product";

export interface PurchaseOrderLine {
    id: number;
    purchaseOrderId: number;
    productId: number;
    product?: Product;

    //these values do not change on receive, they only change on delivery conversion
    basePrice: number; // per unit price, basically product price. This is editable on PO creation. Either product price or manual price.
    totalPrice: number; //basically subtotal price, basePrice * orderedQuantity * discounts
    percentageDiscount: number;
    flatDiscount: number;

    //these values change on receive and delivery conversion, except orderedQuantity
        /** quantity of items yet to be received, this is reduced when items are received. */
        noofOrdersToArrive: number; 
        /** original ordered quantity, received or not received, it stays the same as initial noOfOrdersToArrive */
        orderedQuantity?: number; 
        /** no. of already received. Basically the inverse of noofOrdersToArrive. */
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
  