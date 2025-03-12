import { ReceivedItem } from "@/features/delivery-feature/types/received-item";
import { ReceivedDelivery } from "@/features/delivery-feature/types/received-delivery";
import { Product } from "@/shared/entities/product";
import { createContext, useContext, ReactNode, useState } from 'react';

interface DeliveryContextType {
    delivery: ReceivedDelivery;
    addToDelivery: (receivedItem: ReceivedItem) => void;
    removeFromDelivery: (product: Product) => void;
    getDelivery: () => ReceivedDelivery;
    clearDelivery: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryCartProvider({ children }: { children: ReactNode }) {
    const [delivery, setDelivery] = useState<ReceivedDelivery >(
        {
            items: [],
            total: 0,
            deliveryId: 0,
            deliveredBy: ""
        }
    );

    const calculateTotal = (items: ReceivedItem[]): number => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const updateDeliveryItems = (prevDelivery: ReceivedDelivery, receivedItem: ReceivedItem): ReceivedItem[] => {
        const existingItemIndex = prevDelivery.items.findIndex(
            item => item.product.id === receivedItem.product.id
        );
    
        if (existingItemIndex >= 0) {
            // Update existing item
            return prevDelivery.items.map((item, index) => {
                if (index === existingItemIndex) {
                    const priceToUse = receivedItem.manualPrice ?? item.product.costPrice;
                    return {
                        ...item,
                        quantity: item.quantity + receivedItem.quantity,
                        manualPrice: receivedItem.manualPrice,
                        total: (item.quantity + receivedItem.quantity) * priceToUse
                    };
                }
                return item;
            });
        } else {
            // Add new item
            const itemToAdd = {
                ...receivedItem,
                total: receivedItem.quantity * (receivedItem.manualPrice ?? receivedItem.product.costPrice)
            };
            return [itemToAdd, ...prevDelivery.items];
        }
    };

    // const customPriceProductToDelivery = (product: Product, quantity: number, price: number) => {
    //     const receivedItem: ReceivedItem = {
    //         product: product,
    //         quantity: quantity,
    //         manualPrice: price,
    //         total: quantity * price
    //     };

    //     setDelivery(prevDelivery => {
    //         const updatedItems = updateDeliveryItems(prevDelivery, receivedItem);
    //         return {
    //             items: updatedItems,
    //             total: calculateTotal(updatedItems),
    //             deliveryId: prevDelivery.deliveryId
    //         };
    //     }
    // );
    
    const addToDelivery = (receivedItem: ReceivedItem) => {
        console.log(receivedItem);

        setDelivery(prevDelivery => {
            const updatedItems = updateDeliveryItems(prevDelivery, receivedItem);
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                deliveryId: prevDelivery.deliveryId,
                deliveredBy: prevDelivery.deliveredBy
            };
        });
    };

    const removeFromDelivery = (product: Product) => {
        setDelivery(prevDelivery => {
            const updatedItems = prevDelivery.items.filter(
                item => item.product.id !== product.id
            );

            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
                deliveryId: prevDelivery.deliveryId,
                deliveredBy: prevDelivery.deliveredBy
            };
        });
    };

    const getDelivery = (): ReceivedDelivery => {
        return delivery;
    };

    //method to clear the delivery cart
    const clearDelivery = () => {
        setDelivery({
            items: [],
            total: 0,
            deliveryId: 0,
            deliveredBy: ""
        });
    };

    return (
        <DeliveryContext.Provider value={{
            delivery,
            addToDelivery,
            removeFromDelivery,
            getDelivery,
            clearDelivery
        }}>
            {children}
        </DeliveryContext.Provider>
    );
}

export function useDeliveryCart() {
    const context = useContext(DeliveryContext);
    if (context === undefined) {
        throw new Error('useDelivery must be used within a DeliveryProvider');
    }
    return context;
}
