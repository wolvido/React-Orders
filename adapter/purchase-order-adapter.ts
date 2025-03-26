import { PurchaseOrder } from "@/entities/purchase-order";

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
    itemType: string; // idk
    
    // System Metadata
    sys_CreateTimeStamp: string; // Timestamp of order creation (ISO 8601 format)
    sys_CreateUserStamp: string; // User who created the order
    sys_LastEditedTimeStamp: string; // Timestamp of last edit (ISO 8601 format)
    sys_LastEditedUserStamp: string; // User who last edited the order
    sys_DeletedTimeStamp: string | null; // Timestamp of deletion (ISO 8601 format)
    sys_DeletedUserStamp: string; // User who deleted the order (empty if not deleted)
}

export function PurchaseOrderDTOToEntity(dto: PurchaseOrderDTO): PurchaseOrder {
    return {
        id: dto.purchaseOrderId,
        createDate: new Date(dto.createDate),
        preparedBy: dto.preparedBy,
        deliveryId: dto.deliveryId,
        supplierId: dto.supplierId,
        supplier: {
            id: dto.supplierId || 0,
            name: dto.supplierName,
            address: dto.supplierAddress,
            contactNumber: "",
            contactPerson: "",
        },
        transactionDate: new Date(dto.transactionDate),
        expectedDeliveryDate: new Date(dto.expectedDeliveryDate),
        isComplete: dto.isComplete,
        isDeleted: dto.isDeleted,
        noOfItems: dto.items,
        deliveryFee: dto.deliveryFee,
        otherFee: dto.otherFee,
        potentialCost: dto.potentialCost,
        remarks: dto.remarks,
        poDiscount: dto.poDiscount,
    };
}

export function PurchaseOrderToDTO(po: PurchaseOrder): PurchaseOrderDTO {
    return {
        deliveryId: po.deliveryId,
        createDate: po.createDate.toLocalISOString(),
        preparedBy: po.preparedBy,
        supplierId: po.supplierId,
        supplierName: po.supplier?.name || "",
        supplierAddress: po.supplier?.address || "",
        purchaseOrderId: po.id || 0,
        description: "", // No description in entity
        approvedBy: po.preparedBy,
        remarks: po.remarks, // No remarks in entity
        transactionDate: po.transactionDate.toLocalISOString(),
        expectedDeliveryDate: po.expectedDeliveryDate.toLocalISOString(),
        isComplete: po.isComplete,
        isDeleted: po.isDeleted,
        hasErrors: false, // No error handling in entity
        state: 0, // No state in entity
        isDtoSelected: false, // No DTO selection in entity
        items: po.noOfItems,
        poDiscount: po.poDiscount, // No discount in entity
        deliveryFee: po.deliveryFee,
        otherFee: po.otherFee,
        potentialCost: po.potentialCost,
        orderId: 0, // No related order in entity
        itemType: "", // No item type in entity
        sys_CreateTimeStamp: po.createDate.toLocalISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toLocalISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: po.isDeleted ? new Date().toLocalISOString() : null,
        sys_DeletedUserStamp: "",
    };
}