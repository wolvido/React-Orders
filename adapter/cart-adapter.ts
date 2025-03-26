import { CartItem } from "@/entities/cart-item";
import { Cart } from "@/entities/cart";

export interface RestaurantOrderLineDTO {
    isDeleted: boolean;
    sys_CreateTimeStamp: string;
    sys_CreateUserStamp: string;
    sys_LastEditedTimeStamp: string;
    sys_LastEditedUserStamp: string;
    sys_DeletedTimeStamp: string | null;
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
        sys_CreateTimeStamp: new Date().toLocalISOString(),
        sys_CreateUserStamp: "",
        sys_LastEditedTimeStamp: new Date().toLocalISOString(),
        sys_LastEditedUserStamp: "",
        sys_DeletedTimeStamp: null,
        sys_DeletedUserStamp: "",
        state: 0,
        isDtoSelected: false,
        
        // Other required fields with default values
        restaurantOrderLineId: cartItem.id || 0,
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

export function convertOrderLinesToCart(orderLines: RestaurantOrderLineDTO[]): Cart {
    if (!orderLines || orderLines.length === 0) {
        return {
            items: [],
            total: 0,
            orderId: 0
        };
    }

    try {
        const cartItems: CartItem[] = orderLines.map(line => ({
            id: line.restaurantOrderLineId,
            product: {
                id: line.productId,
                name: line.productName,
                price: line.productPrice,
                costPrice: 0, // Since this isn't in OrderLineDTO, defaulting to 0
                category: line.category,
                brand: '', // Since this isn't in OrderLineDTO, defaulting to empty
                isBundle: line.isBundle,
                stocks: 0, // Since this isn't in OrderLineDTO, defaulting to 0
                unitType: '', // Since this isn't in OrderLineDTO, defaulting to empty
                // Bundle properties are optional, so we don't need to include them
            },
            quantity: line.quantity,
            total: parseFloat((line.productPrice * line.quantity).toFixed(2))
        }));

        const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

        return {
            items: cartItems,
            total: cartTotal,
            orderId: orderLines[0]?.restaurantOrderId || 0
        };
    } catch (error) {
        console.error('Error converting order lines to cart:', error);
        return {
            items: [],
            total: 0,
            orderId: 0
        };
    }
}
