// order-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import { Cart } from '@/entities/cart';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';

// Define the context type
interface OrderContextType {
    currentOrder: Order | null;
    updatePaymentById: (paymentMethod: PaymentMethod, orderId: number) => void;
    updateCart: (cart: Cart) => void;
    updateRemarks: (remarks: string) => void;
    updateDeliveryAddress: (address: string) => void;
    getCurrentOrder: () => Order | null;
    finalizeOrder: () => void;
    initializeOrder: (orderDetails: Partial<Order>) => void;
    updateFulfillmentById: (status: Status, id: number) => void;
    getOrderbyId: (id: number) => Order;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const initializeOrder = (orderDetails: Partial<Order>) => {
        const newOrder: Order = {
            id: Math.floor(1000000 + Math.random() * 9000000),
            orderType: {
                type: "Cash",
                amountDue: 0,
                cashTendered: 0,
                changeDue: 0
            } as PaymentMethod,
            customer: {
                id: 0,
                name: '',
                email: ''
            },
            transactionDate: new Date(),
            total: 0,
            orderStatus: PaymentStatus.unPaid,
            fulfillmentStatus: Status.Pending,
            remarks: '',
            deliveryAddress: '',
            cart: {
                items: [],
                total: 0
            },
            ...orderDetails
        };
        setCurrentOrder(newOrder);
    };

    const updatePaymentById = (paymentMethod: PaymentMethod, orderId:number) => {
        //repo call
        console.log('Payment Request to be sent:', paymentMethod);
    };

    const updateCart = (cart: Cart) => {
        if (!currentOrder) return;
        setCurrentOrder({
            ...currentOrder,
            cart: cart,
            total: cart.total
        });
    };

    const updateRemarks = (remarks: string) => {
        if (!currentOrder) return;
        setCurrentOrder({
            ...currentOrder,
            remarks
        });
    };

    const updateDeliveryAddress = (address: string) => {
        if (!currentOrder) return;
        setCurrentOrder({
            ...currentOrder,
            deliveryAddress: address
        });
    };

    const getCurrentOrder = () => {
        return currentOrder;
    };

    const finalizeOrder = () => {
        console.log('Order finalized:', currentOrder);
        setCurrentOrder(null);
    };

    const getOrderbyId = (id: number): Order => {
        //repo call
        //dummy for now
        return {
            id: id,
            orderType: { type: "Cash", amountDue: 0, cashTendered: 0, changeDue: 0 } as PaymentMethod,
            customer: { id: 0, name: '', email: '' },
            transactionDate: new Date(),
            total: 0,
            orderStatus: PaymentStatus.unPaid,
            fulfillmentStatus: Status.Pending,
            remarks: '',
            deliveryAddress: '',
            cart: { items: [], total: 0 }
        };
    };

    const updateFulfillmentById = (status: Status, id: number) => {
        // const order:Order = getOrderbyId(id);
        // if (!currentOrder) return;

        // if (order.id === id) {
        //     setCurrentOrder({
        //         ...currentOrder,
        //         fulfillmentStatus: status
        //     });
        // }

        console.log('Fulfillment status updated to:', status);

        //repo call
    };

    const value = {
        currentOrder,
        updatePaymentById,
        updateCart,
        updateRemarks,
        updateDeliveryAddress,
        getCurrentOrder,
        finalizeOrder,
        initializeOrder,
        updateFulfillmentById,
        getOrderbyId
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

// Custom hook to use the order context
export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}
