

interface PurchaseOrderDTO {
    // Delivery data
    deliveryId?: number; // Related delivery identifier
    createDate: string; // Date the order was created (ISO 8601 format)
        //also creationDate on delivery
    preparedBy: string; // Name of the person who prepared the order
        //also handledBy: string; // Name of the person who handled the delivery
    
    //supplier data
    supplierId?: number; // Unique identifier of the supplier
    supplierName: string; // Name of the supplier
    supplierAddress: string; // Address of the supplier
        //all the property here is on PO and supplier

    // Basic Order Details
    purchaseOrderId: number; // Unique identifier for the purchase order
    description: string; // Description of the purchase order
    
    approvedBy: string; // Name of the person who approved the order
        //same as preparedBy for now

    remarks: string; // Additional remarks or notes

    transactionDate: string; // when the transaction waas finalized (ISO 8601 format)

    expectedDeliveryDate: string; // Expected date of delivery (ISO 8601 format)
    
    // Order Status
    isComplete: boolean; // Indicates if the purchase order is complete
    isDeleted: boolean; // Indicates if the order has been deleted
    hasErrors: boolean; // Indicates if there are errors in the order
    state: number; // State of the purchase order
    isDtoSelected: boolean; // Indicates if the DTO is selected
    
    // Financial Details
    items: number; // Number of items in the order
    poDiscount: number; // Discount applied to the purchase order
    deliveryFee: number; // Delivery fee for the order
    otherFee: number; // Any additional fees associated with the order
    potentialCost: number; // Estimated total cost of the order
    
    // Related Identifiers
    orderId?: number; // Related order identifier
    itemType: string; // Type of items in the order
    
    // System Metadata
    sys_CreateTimeStamp: string; // Timestamp of order creation (ISO 8601 format)
    sys_CreateUserStamp: string; // User who created the order
    sys_LastEditedTimeStamp: string; // Timestamp of last edit (ISO 8601 format)
    sys_LastEditedUserStamp: string; // User who last edited the order
    sys_DeletedTimeStamp: string; // Timestamp of deletion (ISO 8601 format)
    sys_DeletedUserStamp: string; // User who deleted the order (empty if not deleted)
}

