import { Order } from "@/entities/order";
import Status from "@/enums/status";
import PaymentStatus from "@/enums/payment-status";
// import { Customer } from "@/entities/customers";
import { Cart } from "@/entities/cart";

// Create interface for the source data
interface RestaurantOrderDTO {
    restaurantOrderId: number;
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
}

// Create the adapter
export class OrderAdapter {
    static adapt(dto: RestaurantOrderDTO): Order {
        return {
            id: dto.restaurantOrderId,
            referenceNo: dto.restaurantOrderId,
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
            },
            cart: this.createDummyCart() // Placeholder for now
        };
    }

    private static determinePaymentStatus(dto: RestaurantOrderDTO): PaymentStatus {
        if (dto.isPaid) {
            return PaymentStatus.paid;
        }
        return dto.balance < dto.total ? PaymentStatus.partialPaid : PaymentStatus.unPaid;
    }

    private static createDummyCart(): Cart {
        // Implement dummy cart creation here

        return {
            // Add dummy cart properties
            
        } as Cart;
    }
}
