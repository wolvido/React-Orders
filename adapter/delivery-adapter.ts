import { Delivery } from "@/entities/delivery";

export interface DeliveryDTO {
    // System Metadata Fields
    isDeleted: boolean; // Indicates if the record has been deleted (true = deleted)
    sys_CreateTimeStamp: string; // Timestamp when the record was created
    sys_CreateUserStamp: string; // Username or ID of the user who created the record
    sys_LastEditedTimeStamp: string; // Timestamp when the record was last modified
    sys_LastEditedUserStamp: string; // Username or ID of the last user who modified the record
    sys_DeletedTimeStamp: string | null; // Timestamp when the record was deleted (if isDeleted = true)
    sys_DeletedUserStamp: string; // Username or ID of the user who deleted the record
  
    // State & Selection Flags
    state: number; // Represents the current state of the delivery (e.g., 0 = "pending", 1 = "delivered")
    isDtoSelected: boolean; // Indicates whether this record is selected for a Data Transfer Object (DTO) operation
    isSelected: boolean; // Another selection flag, possibly used in UI interactions or batch operations
  
    // Delivery Information
    deliveryDate: string; // The date when the delivery is scheduled or occurred
    deliveryID: number; // Unique identifier for this delivery
    creationDate: string; // Date when this delivery record was created in the system
    supplierId: number; // ID of the supplier providing the goods
    supplierName: string; // Name of the supplier
    items: number; // Number of items in the delivery
    total: number; // Total cost/value of the delivery
    plateNO: string; // Vehicle's plate number used for delivery
  
    // People Involved
    createdBy: string; // User who created this delivery record
    handledBy: string; // Person responsible for handling the delivery
    deliveredBy: string; // Person who physically delivered the shipment
    confirmedBy: string; // Person who confirmed the delivery
  
    // Receipt & Costs
    deliveryReceipt: string; // Reference or identifier for the delivery receipt
    receiptDate: string; // Date when the delivery receipt was issued
    shippingCost: number; // Cost of shipping the goods
    deliveryCost: number; // Additional costs directly related to the delivery
    otherFee: number; // Any extra fees related to this delivery
    deliveryDiscount: number; // Any discount applied to the delivery
  
    // Order & Confirmation Details
    purchaseOrderId: number; // ID of the purchase order associated with this delivery
    isConfirmed: boolean; // Whether the delivery has been confirmed (true = confirmed)
    deliveryConfirmationId: number; // Unique identifier for the confirmation record
    confirmationDate: string; // Date when the delivery was confirmed
  
    // Delivery Status
    status: string; // Current status of the delivery (e.g., "Pending", "Completed", "Canceled")
}

export class DeliveryAdapter {

    static adaptToDTO(delivery: Delivery): DeliveryDTO {
        return {
            isDeleted: false,
            sys_CreateTimeStamp: new Date().toLocaleString(),
            sys_CreateUserStamp: "",
            sys_LastEditedTimeStamp: new Date().toLocaleString(),
            sys_LastEditedUserStamp: "",
            sys_DeletedTimeStamp: null,
            sys_DeletedUserStamp: "",
            state: 0,
            isDtoSelected: false,
            deliveryDate: delivery.deliveryDate.toISOString(),
            deliveryID: 0,
            creationDate: new Date().toLocaleString(),
            supplierId: delivery.supplier.id,
            supplierName: delivery.supplier.name,
            items: 0,
            total: delivery.total,
            createdBy: '',
            handledBy: delivery.handledBy,
            deliveredBy: delivery.deliveredBy,
            deliveryReceipt: delivery.receiptNumber,
            shippingCost: 0,
            deliveryCost: 0,
            otherFee: 0,
            deliveryDiscount: 0,
            purchaseOrderId: 0,
            isConfirmed: false,
            deliveryConfirmationId: 0,
            confirmedBy: "",
            confirmationDate: new Date().toLocaleString(),
            status: "Pending",

            //update
            isSelected: false,
            plateNO: "",
            receiptDate: new Date().toLocaleString(),

        };
    }

    static adapt(dto: DeliveryDTO): Delivery {
        return {
            id: dto.deliveryID,
            receiptNumber: dto.deliveryReceipt,
            creationDate: new Date(dto.creationDate),
            supplier: {
                id: dto.supplierId,
                name: dto.supplierName,
                address: '',
                contactNumber: '',
                contactPerson: ''
            },
            deliveryDate: new Date(dto.deliveryDate),
            deliveredBy: dto.deliveredBy,
            total: dto.total,
            handledBy: dto.handledBy,
        };
    }
}