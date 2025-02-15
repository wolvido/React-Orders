// order-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import { Cart } from '@/entities/cart';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';

import { OrderRepository } from '@/repositories/order-repository';
import { Customer } from '@/entities/customers';

//dummy delete later
//import { orders } from '@/dummy-data/dummy-orders';

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
    getOrderbyId: (id: number) => Promise<Order | undefined>;
    getAllCustomers: () => Promise<Customer[]>;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const [cart, setCart] = useState<Cart>({ items: [], total: 0, orderId: 0 });

    const orderRepository = new OrderRepository();

    const initializeOrder = (orderDetails: Partial<Order>) => {
        const newOrder: Order = {
            id: Math.floor(1000000 + Math.random() * 9000000),
            referenceNo: Math.floor(1000000 + Math.random() * 9000000),
            orderType: 'Walk-in',
            customer: {
                id: 0,
                name: '',
                contactNumber: '',
                address: ''
            },
            transactionDate: new Date(),
            balance: 0,
            total: 0,
            orderStatus: PaymentStatus.unPaid,
            fulfillmentStatus: Status.Pending,
            remarks: '',
            deliveryAddress: '',
            handledBy: '',
            isPaid: false,
            isComplete: false,
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
            total: cart.total,
            balance: cart.total
        });

        setCart(cart);
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

    const finalizeOrder = async () => {
        if (!currentOrder) return;
    
        try {
            // console.log('Finalizing order:', currentOrder);
            const jsonReturn = await orderRepository.create(currentOrder);
            
            setCart({ ...cart, orderId: jsonReturn.orderId });

            //here send the cart to repo
            await orderRepository.createOrderLines(cart);

            setCurrentOrder(null);

            console.log('Order finalized with ID:', jsonReturn.orderId);

        } catch (error) {

            console.error('Failed to finalize order:', error);
            
            //needs to be handled for user here
        }
    };

    const getOrderbyId = async (id: number): Promise<Order | undefined> => {

        try {
            const order = await orderRepository.getById(id);
            if (order) {
                return order;

            } else {
                return undefined;

            }
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
        
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

    const getAllCustomers = async () => {
        const customers = await orderRepository.getAllCustomers();
        console.log(customers);
        return await orderRepository.getAllCustomers();
       
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
        getOrderbyId,
        getAllCustomers
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
