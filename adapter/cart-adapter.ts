import { Cart } from "../entities/cart";

interface RestaurantOrderDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    restaurantOrderId: number;
    releaseDate: string;
    dueDate: string;
    releasedBy: string;
    isGrouped: boolean;
    balance: number;
    customerId: number;
    customerName: string;
    contactNumber: string;
    address: string;
    orderDate: string;
    orderType: string;
    diningType: string;
    preparedBy: string;
    handledBy: string;
    roomHistoryId: number;
    roomNumber: number;
    tableNumber: number;
    isComplete: boolean;
    subtotal: number;
    total: number;
    discount: number;
    description: string;
    status: string;
    servedTime: string;
    note: string;
    salesAgentId: number;
    salesAgentName: string;
    invoiceNumber: string;
    isPaid: boolean;
    bulkShipment: number;
    deliveryFee: number;
    otherFee: number;
    drNo: string;
}

interface RestaurantOrderLineDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string;
    sys_DeletedUserStamp: string;
    state: number;
    isDtoSelected: boolean;
    restaurantOrderLineId: number;
    restaurantOrderId: number;
    productSubmenuId: number;
    productId: number;
    rootBundleId: number;
    parentBundleId: number;
    productName: string;
    category: string;
    productPrice: number;
    isPrinted: boolean;
    isServed: boolean;
    discount: number;
    quantity: number;
    status: string;
    remarks: string;
    isBundle: boolean;
    isPaid: boolean;
    isPreparing: boolean;
    quantityChange: number;
    restaurantOrder: RestaurantOrderDTO;
    subTotal: number;
    orderDate: string;
    hasPumping: boolean;
    pumpRate: number;
    additionalComp: number;
    driverCommissionRate: number;
    itemCode: string;
}


export function convertCartToOrderLines(cart: Cart): RestaurantOrderLineDTO[] {
    return cart.items.map(cartItem => ({
        // Required product-related fields
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        category: cartItem.product.category,
        productPrice: cartItem.product.price,
        quantity: cartItem.quantity,
        isBundle: cartItem.product.isBundle,
        
        // Default values for required fields
        restaurantOrderId: cart.orderId,
        status: "",
        
        // System fields with default values
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: "",
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        
        // Other required fields with default values
        restaurantOrderLineId: 0,
        productSubmenuId: 0,
        rootBundleId: 0,
        parentBundleId: 0,
        isPrinted: false,
        isServed: false,
        discount: 0,
        remarks: "",
        isPaid: false,
        isPreparing: false,
        quantityChange: 0,
        subTotal: 0,
        orderDate: new Date().toISOString(),
        hasPumping: false,
        pumpRate: 0,
        additionalComp: 0,
        driverCommissionRate: 0,
        itemCode: "",
        
        // Empty restaurant order object
        restaurantOrder: {
            isDeleted: false,
            sys_CreateTimeStamp: new Date().toISOString(),
            sys_CreateUserStamp: "",
            sys_LastEditedTimeStamp: new Date().toISOString(),
            sys_LastEditedUserStamp: "",
            sys_DeletedTimeStamp: new Date().toISOString(),
            sys_DeletedUserStamp: "",
            state: 0,
            isDtoSelected: false,
            restaurantOrderId: 0,
            releaseDate: new Date().toISOString(),
            dueDate: new Date().toISOString(),
            releasedBy: "",
            isGrouped: false,
            balance: 0,
            customerId: 0,
            customerName: "",
            contactNumber: "",
            address: "",
            orderDate: new Date().toISOString(),
            orderType: "",
            diningType: "",
            preparedBy: "",
            handledBy: "",
            roomHistoryId: 0,
            roomNumber: 0,
            tableNumber: 0,
            isComplete: false,
            subtotal: 0,
            total: 0,
            discount: 0,
            description: "",
            status: "",
            servedTime: new Date().toISOString(),
            note: "",
            salesAgentId: 0,
            salesAgentName: "",
            invoiceNumber: "",
            isPaid: false,
            bulkShipment: 0,
            deliveryFee: 0,
            otherFee: 0,
            drNo: ""
        }
    }));
}