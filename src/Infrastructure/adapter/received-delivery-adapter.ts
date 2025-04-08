import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";

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

    percentageDiscount?: number;
    flatDiscount?: number;
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
        totalPrice: receivedDeliveryItem.total,
        vehicleId: 0,
        vehicleName: "",

        percentageDiscount: receivedDeliveryItem.discountPercentage,
        flatDiscount: receivedDeliveryItem.discountFlat,
        
        // System fields with default values
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toLocalISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toLocalISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: null,
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        
        // Other required fields with default values
        deliverylineID: receivedDeliveryItem.id || 0,
        deliveryID: receivedDelivery.deliveryId,
    }));
    return deliveryLines;
}

export function deliveryLinesToReceivedDelivery(deliveryLines: DeliveryLineDTO[]): ReceivedDelivery {
    if (!deliveryLines || deliveryLines.length === 0) {
        return {
            total: 0,
            items: [],
            deliveryId: 0,
            deliveredBy: "",
        };
    }

    try {
        const receivedItems: ReceivedItem[] = deliveryLines.map(deliveryLine => ({
            id: deliveryLine.deliverylineID,
            product: {
                id: deliveryLine.productID,
                name: deliveryLine.productName,
                brand: deliveryLine.brand,
                costPrice: deliveryLine.unitPrice,
                unitType: deliveryLine.units,
                category: "",
                isBundle: false,
                stocks: 0,
                price: 0,
            },
            quantity: deliveryLine.receivedQuantity,
            total: deliveryLine.totalPrice,

            manualPrice: deliveryLine.unitPrice,
            discountPercentage: deliveryLine.percentageDiscount,
            discountFlat: deliveryLine.flatDiscount,
        }));

        const total = receivedItems.reduce((acc, item) => acc + item.total, 0);

        return {
            total,
            items: receivedItems,
            deliveryId: deliveryLines[0].deliveryID,
            deliveredBy: deliveryLines[0].deliveredBy,
        };
    } catch (error) {
        console.error('Error converting delivery lines to received delivery:', error);
        return {
            total: 0,
            items: [],
            deliveryId: 0,
            deliveredBy: "",
        };
    }
}

export function deliveryLineToReceivedItem(deliveryLine: DeliveryLineDTO): ReceivedItem {
    return {
        id: deliveryLine.deliverylineID,
        product: {
            id: deliveryLine.productID,
            name: deliveryLine.productName,
            brand: deliveryLine.brand,
            costPrice: deliveryLine.unitPrice,
            unitType: deliveryLine.units,
            category: "",
            isBundle: false,
            stocks: 0,
            price: 0,
        },
        quantity: deliveryLine.receivedQuantity,
        total: deliveryLine.totalPrice,

        discountPercentage: deliveryLine.percentageDiscount,
        discountFlat: deliveryLine.flatDiscount,
    };
}