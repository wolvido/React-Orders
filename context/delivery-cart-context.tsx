import { ReceivedItem } from "@/entities/received-item";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { Product } from "@/entities/product";
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
            total: 0
        }
    );

    const calculateTotal = (items: ReceivedItem[]): number => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const addToDelivery = (receivedItem: ReceivedItem) => {
        setDelivery(prevDelivery => {
            // Check if product already exists in delivery
            const existingItemIndex = prevDelivery.items.findIndex(
                item => item.product.key === receivedItem.product.key
            );

            let updatedItems: ReceivedItem[];

            if (existingItemIndex >= 0) {
                // Update existing item
                updatedItems = prevDelivery.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + receivedItem.quantity,
                            total: (item.quantity + receivedItem.quantity) * item.product.costPrice
                        };
                    }
                    return item;
                });
            } else {
                // Add new item
                updatedItems = [...prevDelivery.items, receivedItem];
            }

            return {
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        });
    };

    const removeFromDelivery = (product: Product) => {
        setDelivery(prevDelivery => {
            const updatedItems = prevDelivery.items.filter(
                item => item.product.key !== product.key
            );

            return {
                items: updatedItems,
                total: calculateTotal(updatedItems)
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
            total: 0
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
