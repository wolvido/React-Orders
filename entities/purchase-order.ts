import { Supplier } from './supplier';

export interface PurchaseOrder {
    id: number;
    createDate: Date;
    preparedBy: string;
    deliveryId?: number;
    supplierId?: number;
    supplier?: Supplier;

    /**
     * date after finalization of PO
     */
    transactionDate: Date;

    expectedDeliveryDate: Date;

    isComplete: boolean;
    isDeleted: boolean;
    
    noOfItems: number;
    deliveryFee: number;
    poDiscount: number;
    otherFee: number;

    potentialCost: number;

    remarks: string;
}