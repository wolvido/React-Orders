import { Delivery } from "@/entities/delivery";

export interface DeliveryDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    deliveryDate: string;
    deliveryID: number;
    creationDate: string;
    supplierId: number;
    supplierName: string;
    items: number;
    total: number;
    createdBy: string;
    handledBy: string;
    deliveredBy: string;
    deliveryReceipt: string;
    shippingCost: number;
    deliveryCost: number;
    otherFee: number;
    deliveryDiscount: number;
    purchaseOrderId: number;
    isConfirmed: boolean;
    deliveryConfirmationId: number;
    confirmedBy: string;
    confirmationDate: string;
    status: string;
}

export class DeliveryAdapter {

    static adaptToDTO(delivery: Delivery): DeliveryDTO {
        return {
            isDeleted: false,
            sys_CreateTimeStamp: new Date().toISOString(),
            sys_CreateUserStamp: "",
            sys_LastEditedTimeStamp: new Date().toISOString(),
            sys_LastEditedUserStamp: "",
            sys_DeletedTimeStamp: new Date().toISOString(),
            sys_DeletedUserStamp: "",
            state: 0,
            isDtoSelected: false,
            deliveryDate: delivery.deliveryDate.toISOString(),
            deliveryID: 0,
            creationDate: new Date().toISOString(),
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
            confirmationDate: new Date().toISOString(),
            status: "Pending"
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