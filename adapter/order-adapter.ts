import { Order } from "@/entities/order";
import Status from "@/enums/status";
import PaymentStatus from "@/enums/payment-status";

// Create interface for the source data
interface RestaurantOrderDTO {
    restaurantOrderId?: number;
    orderType: string;
    orderDate: string;
    balance: number;
    total: number;
    isPaid: boolean;
    isComplete: boolean;
    handledBy: string;
    note: string;
    customerId: number;
    customerName: string;
    contactNumber: string | null;
    address: string | null;

    // ... other fields from the JSON
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string | null;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    releaseDate: string;
    dueDate: string;
    releasedBy: string;
    isGrouped: boolean;
    diningType: string;
    preparedBy: string;
    roomHistoryId: number;
    roomNumber: number;
    tableNumber: number;
    subtotal: number;
    discount: number;
    description: string;
    status: string;
    servedTime: string;
    salesAgentId: number;
    salesAgentName: string;
    invoiceNumber: string;
    bulkShipment: number;
    deliveryFee: number;
    otherFee: number;
    drNo: string;
}

// Create the adapter
export class OrderAdapter {
    static adapt(dto: RestaurantOrderDTO): Order {
        return {
            id: dto.restaurantOrderId || 0,
            orderType: dto.orderType,
            transactionDate: new Date(dto.orderDate),
            balance: dto.balance,
            total: dto.total,
            orderStatus: this.determinePaymentStatus(dto),
            fulfillmentStatus: dto.isComplete ? Status.Delivered  : Status.Pending,
            remarks: dto.note || '',
            deliveryAddress: dto.address || 'pickup',
            handledBy: dto.handledBy,
            isPaid: dto.isPaid,
            isComplete: dto.isComplete,
            customer: {
                id: dto.customerId,
                name: dto.customerName,
                contactNumber: dto.contactNumber || '',
                address: dto.address || ''
            }
        };
    }

    private static determinePaymentStatus(dto: RestaurantOrderDTO): PaymentStatus {
        if (dto.isPaid) {
            return PaymentStatus.paid;
        }
        return dto.balance < dto.total ? PaymentStatus.partialPaid : PaymentStatus.unPaid;
    }

    static reverse(order: Order): RestaurantOrderDTO {
        return {
            // sys something something
            isDeleted: false,
            sys_CreateTimeStamp: new Date().toISOString(),
            sys_CreateUserStamp: "",
            sys_LastEditedTimeStamp: new Date().toISOString(),
            sys_LastEditedUserStamp: "",
            sys_DeletedTimeStamp: null,
            sys_DeletedUserStamp: "",
            state: 0,
            isDtoSelected: false,

            // Mapped fields from Order
            restaurantOrderId: order.id || 0,
            orderType: order.orderType,
            orderDate: order.transactionDate.toISOString(),
            balance: order.balance,
            total: order.total,
            isPaid: order.isPaid,
            isComplete: order.isComplete,
            handledBy: order.handledBy,
            note: order.remarks,
            customerId: order.customer.id,
            customerName: order.customer.name,
            contactNumber: order.customer.contactNumber || "",
            address: order.deliveryAddress || order.customer.address ,

            // restaurant bullshit
            releaseDate: new Date().toISOString(),
            dueDate: new Date().toISOString(),
            releasedBy: "",
            isGrouped: false,
            diningType: "",
            preparedBy: "",
            roomHistoryId: 0,
            roomNumber: 0,
            tableNumber: 0,
            subtotal: order.total, // subtotal is same as total because idk
            discount: 0,
            description: "",
            status: "",
            servedTime: new Date().toISOString(),
            salesAgentId: 0,
            salesAgentName: "",
            invoiceNumber: "",
            bulkShipment: 0,
            deliveryFee: 0,
            otherFee: 0,
            drNo: ""
        };
    }

    // static adaptOrderUpdate(order: Order): RestaurantOrderDTO {
    //     return {
    //         // sys something something
    //         isDeleted: false,
    //         sys_CreateTimeStamp: new Date().toISOString(),
    //         sys_CreateUserStamp: "",
    //         sys_LastEditedTimeStamp: new Date().toISOString(),
    //         sys_LastEditedUserStamp: "",
    //         sys_DeletedTimeStamp: null,
    //         sys_DeletedUserStamp: "",
    //         state: 0,
    //         isDtoSelected: false,

    //         // Mapped fields from Order
    //         restaurantOrderId: order.id || 0,
    //         orderType: order.orderType,
    //         orderDate: order.transactionDate.toISOString(),
    //         balance: order.balance,
    //         total: order.total,
    //         isPaid: order.isPaid,
    //         isComplete: order.isComplete,
    //         handledBy: order.handledBy,
    //         note: order.remarks,
    //         customerId: order.customer.id,
    //         customerName: order.customer.name,
    //         contactNumber: order.customer.contactNumber || "",
    //         address: order.deliveryAddress || order.customer.address ,

    //         // restaurant bullshit
    //         releaseDate: new Date().toISOString(),
    //         dueDate: new Date().toISOString(),
    //         releasedBy: "",
    //         isGrouped: false,
    //         diningType: "",
    //         preparedBy: "",
    //         roomHistoryId: 0,
    //         roomNumber: 0,
    //         tableNumber: 0,
    //         subtotal: order.total, // subtotal is same as total because idk
    //         discount: 0,
    //         description: "",
    //         status: "",
    //         servedTime: new Date().toISOString(),
    //         salesAgentId: 0,
    //         salesAgentName: "",
    //         invoiceNumber: "",
    //         bulkShipment: 0,
    //         deliveryFee: 0,
    //         otherFee: 0,
    //         drNo: ""
    //     };
    // }

}
