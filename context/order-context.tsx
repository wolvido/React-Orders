// order-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import { Cart } from '@/entities/cart';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { CashPayment, ChequePayment, BankTransferPayment, PaymentGateway } from '@/entities/payment-method';

// Define the context type
interface OrderContextType {
    currentOrder: Order | null;
    updatePaymentMethod: (paymentMethod: PaymentMethod) => void;
    updateCart: (cart: Cart) => void;
    updateRemarks: (remarks: string) => void;
    updateDeliveryAddress: (address: string) => void;
    getCurrentOrder: () => Order | null;
    finalizeOrder: () => void;
    initializeOrder: (orderDetails: Partial<Order>) => void;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Type guard for cash payment
function isCashPayment(payment: PaymentMethod): payment is CashPayment {
    return payment.type === 'Cash';
}

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
            orderStatus: Status.Pending,
            fulfillmentStatus: PaymentStatus.unPaid,
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

    const updatePaymentMethod = (paymentMethod: PaymentMethod) => {
        if (!currentOrder) return;

        let paymentStatus = PaymentStatus.unPaid;

        if (isCashPayment(paymentMethod)) {
            // Now TypeScript knows this is specifically a CashPayment
            paymentStatus = paymentMethod.cashTendered >= paymentMethod.amountDue 
                ? PaymentStatus.paid 
                : PaymentStatus.unPaid;
        }

        setCurrentOrder({
            ...currentOrder,
            orderType: paymentMethod,
            fulfillmentStatus: paymentStatus
        });
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
        setCurrentOrder(null);
    };

    const value = {
        currentOrder,
        updatePaymentMethod,
        updateCart,
        updateRemarks,
        updateDeliveryAddress,
        getCurrentOrder,
        finalizeOrder,
        initializeOrder
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
