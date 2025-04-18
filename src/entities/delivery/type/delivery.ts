import { Supplier } from "../../supplier/type/supplier";

export interface Delivery {
    id: number; 

    receiptNumber: string; //delivery receipt
    supplier: Supplier
    deliveryDate: Date;
    deliveredBy: string;
    //receivedItems: ReceivedDelivery;
    total: number; //total
    handledBy: string;

    creationDate: Date;

    plateNo: string; 
    receiptDate: Date;
    items: number; //items count

    /**
     * if delivery is from a purchase order
     */
    purchaseOrderId?: number; 

}