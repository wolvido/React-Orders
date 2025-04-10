import { Product } from "../../product/type/product";

export interface PurchaseOrderLine {
    id: number;
    purchaseOrderId: number;
    productId: number;
    product?: Product;

    //these values do not change on receive, they are set when the PO is created regardless of any editing done on receive
    basePrice: number; // per unit price, basically product price. This is editable on PO creation.
    totalPrice: number; //basically subtotal price, basePrice * orderedQuantity * discounts
    percentageDiscount: number;
    flatDiscount: number;

    noofOrdersToArrive: number; // quantity of items yet to be received
    orderedQuantity?: number; // original ordered quantity, received or not received, it stays the same as initial noOfOrdersToArrive
    receivedQuantity?: number; // null when not received. Basically the inverse of noofOrdersToArrive.

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
  