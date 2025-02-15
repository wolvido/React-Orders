import { Cart } from "../entities/cart";

export interface RestaurantOrderLineDTO {
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
    discount: number;
    quantity: number;
    status: string;
    remarks: string;
    isBundle: boolean;
    isPaid: boolean;
}

export function convertCartToOrderLines(cart: Cart): RestaurantOrderLineDTO[] {
    console.log('Converting cart to order lines:', cart);
    const orderLines: RestaurantOrderLineDTO[] = cart.items.map(cartItem => ({
        // Product-related fields
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        category: cartItem.product.category,
        productPrice: cartItem.product.price,
        quantity: cartItem.quantity,
        isBundle: cartItem.product.isBundle,
        
        // System fields with default values
        isDeleted: false,
        sys_CreateTimeStamp: new Date().toISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: new Date().toISOString(),
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        
        // Other required fields with default values
        restaurantOrderLineId: 0,
        restaurantOrderId: cart.orderId,
        productSubmenuId: 0,
        rootBundleId: 0,
        parentBundleId: 0,
        isPrinted: false,
        discount: 0,
        status: "Pending",
        remarks: "",
        isPaid: false
    }));

    console.log('Order Lines:', orderLines);

    return orderLines;
}