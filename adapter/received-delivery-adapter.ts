import { ReceivedDelivery } from "@/entities/received-delivery";

export interface DeliveryLineDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string; // ISO format timestamp
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string | null;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    itemType: string;
    deliverylineID: number;
    productID: number;
    rawMaterialId: number;
    deliveryID: number;
    units: string;
    productName: string;
    itemCode: string;
    description: string;
    brand: string;
    deliveredBy: string;
    totalPrice: number;
    receivedQuantity: number;
    remarks: string;
    unitPrice: number;
    vehicleId: number;
    vehicleName: string;
}

/**
 * Converts a received delivery to a list of delivery lines.
 * @param receivedDelivery The received delivery to convert.
 * @returns The list of delivery lines.
 */
export function convertReceivedDeliveryToDeliveryLines(receivedDelivery: ReceivedDelivery): DeliveryLineDTO[] {
    console.log('Converting received delivery to delivery lines:', receivedDelivery);
    const deliveryLines: DeliveryLineDTO[] = receivedDelivery.items.map(receivedDeliveryItem => ({
        // Product-related fields
        productID: receivedDeliveryItem.product.id,
        productName: receivedDeliveryItem.product.name,
        description: "",
        brand: receivedDeliveryItem.product.brand,
        unitPrice: receivedDeliveryItem.manualPrice ?? receivedDeliveryItem.product.costPrice,
        receivedQuantity: receivedDeliveryItem.quantity,
        itemType: "",
        itemCode: "",
        rawMaterialId: 0,
        units: receivedDeliveryItem.product.unitType,
        remarks: "",
        deliveredBy: receivedDelivery.deliveredBy,
        totalPrice: (receivedDeliveryItem.manualPrice ?? receivedDeliveryItem.product.costPrice) * receivedDeliveryItem.quantity,
        vehicleId: 0,
        vehicleName: "",
        
        // System fields with default values
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: null,
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        
        // Other required fields with default values
        deliverylineID: receivedDeliveryItem.id,
        deliveryID: receivedDelivery.deliveryId,
    }));
    return deliveryLines;
}