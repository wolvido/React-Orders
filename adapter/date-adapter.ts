import { Order } from '../entities/order';

export class DateAdapter {
    static adaptOrder(order: Order): Order {
        // First adapt the main transaction date
        const adaptedOrder = {
            ...order,
            transactionDate: new Date(order.transactionDate),
            orderType: {
                ...order.orderType,
                // Handle payment method specific dates
                ...(order.orderType.type === 'Bank Transfer' && {
                    depositDate: new Date(order.orderType.depositDate)
                }),
                ...(order.orderType.type === 'Cheque' && {
                    chequeDate: new Date(order.orderType.chequeDate)
                })
            }
        };

        return adaptedOrder;
    }

    static adaptOrders(orders: Order[]): Order[] {
        return orders.map(order => DateAdapter.adaptOrder(order));
    }
}