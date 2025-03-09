// order-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import { Cart } from '@/entities/cart';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { OrderRepository } from '@/repositories/order-repository';
import { Customer } from '@/entities/customers';
import { OrderLineRepository } from '@/repositories/order-line-repository';
import { CustomerRepository } from '@/repositories/customer-repository';

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
    finalizeOrderUpdate: () => void;
    initializeOrder: (orderDetails: Partial<Order>) => void;
    updateFulfillmentById: (status: Status, id: number) => void;
    getOrderbyId: (id: number) => Promise<Order | undefined>;
    getAllCustomers: () => Promise<Customer[]>;
    setOrder: (order: Order) => void;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const [cart, setCart] = useState<Cart>({ items: [], total: 0, orderId: 0 });

    const orderRepository = new OrderRepository();
    const orderLineRepository = new OrderLineRepository();
    const customerRepository = new CustomerRepository();

    const initializeOrder = (orderDetails: Partial<Order>) => {
        const newOrder: Order = {
            id: 0,
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
        if (remarks === '') {
            return;
        }
        console.log('delivery remarks input:', remarks);
        console.log('current remarks:', currentOrder.deliveryAddress);

        setCurrentOrder({
            ...currentOrder,
            remarks
        });
    };

    const updateDeliveryAddress = (address: string) => {
        if (!currentOrder) return;
        if (address === '') {
            return;
        }
        console.log('delivery address input:', address);
        console.log('current delivery address:', currentOrder.deliveryAddress);

        setCurrentOrder({
            ...currentOrder,
            deliveryAddress: address
        });
    };

    const getCurrentOrder = () => {
        return currentOrder;
    };

    const finalizeOrder = async () => {
        const orderToFinalize = currentOrder;
        if (!orderToFinalize) return;
    
        try {
            console.log('Finalizing order:', orderToFinalize);

            orderToFinalize.id = 0;

            const jsonReturn = await orderRepository.create(orderToFinalize);
            console.log('order address:', orderToFinalize.deliveryAddress);

            const updatedCart = { ...cart, orderId: jsonReturn.orderId };

            const result = await orderLineRepository.createOrderLines(updatedCart);

            console.log('Order finalized with ID:', jsonReturn.orderId);
            console.log('Order lines created:', result);

            setCart({ items: [], total: 0, orderId: 0 });
            setCurrentOrder(null);

        } catch (error) {

            console.error('Failed to finalize order:', error);
            
            //needs to be handled for user here
        }
    };

    const finalizeOrderUpdate = async () => {
        if (!currentOrder) return;
    
        try {
            console.log('Finalizing order update:', currentOrder);

            const existingCart = await orderLineRepository.getCart(currentOrder.id);

            console.log('old cart from context log:', existingCart);
            console.log('New cart from context log:', cart);

            //new cart items
            const newCartItems = cart.items.filter((item) => item.id === 0);
            if (newCartItems.length > 0){
                console.log('created items from context:', newCartItems)
                await orderLineRepository.createOrderLines({ items: newCartItems, total: cart.total, orderId: currentOrder.id });
            }
            
            //updated cart items
            const updatedCartItems = cart.items.filter((item) => item.id !== 0);
            if (updatedCartItems.length > 0){
                console.log('updated items from context:', updatedCartItems);
                await orderLineRepository.updateOrderLines({ items: updatedCartItems, total: cart.total, orderId: currentOrder.id });
            }

            //deleted items
            const deletedCartItems = existingCart.items.filter((item) => !cart.items.some((i) => i.id === item.id));
            if (deletedCartItems.length > 0)
            {
                console.log('Deleted items from context:', deletedCartItems);

                await orderLineRepository.deleteOrderLines({ items: deletedCartItems, total: cart.total, orderId: currentOrder.id });
            }
            
            await orderRepository.update(currentOrder);

            setCart({ items: [], total: 0, orderId: 0 });
            setCurrentOrder(null);

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

    const setOrder = (order: Order) => {
        setCurrentOrder(order);
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
        const customers = await customerRepository.getAllCustomers();
        console.log('customers: '+customers);
        return customers;
       
    };

    const value = {
        currentOrder,
        updatePaymentById,
        updateCart,
        updateRemarks,
        updateDeliveryAddress,
        getCurrentOrder,
        finalizeOrder,
        finalizeOrderUpdate,
        initializeOrder,
        updateFulfillmentById,
        getOrderbyId,
        getAllCustomers,
        setOrder
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
