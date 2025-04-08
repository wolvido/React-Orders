import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import { Product } from "@/src/entities/product/type/product";
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
    const [delivery, setDelivery] = useState<ReceivedDelivery>(
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

    /**
     * Updates the delivery cart state with a new item or updates the existing item if it already exists.
     * @param prevDelivery original delivery type state
     * @param receivedItem item to be added to the delivery state
     * @returns updated delivery cart state
     */
    const updateDeliveryItems = (prevDelivery: ReceivedDelivery, receivedItem: ReceivedItem): ReceivedItem[] => {
        const existingItemIndex = prevDelivery.items.findIndex(
            item => item.product.id === receivedItem.product.id
        );
    
        if (existingItemIndex >= 0) {
            // Update existing item
            console.log("Updating existing item in delivery cart", receivedItem);
            return prevDelivery.items.map((item, index) => {
                if (index === existingItemIndex) {
                    const priceToUse = receivedItem.manualPrice ?? item.product.costPrice;
                    const flatDiscount = receivedItem.discountFlat || 0;
                    const percentageDiscount = receivedItem.discountPercentage || 0;
                    const discountAmount = flatDiscount + (priceToUse * (percentageDiscount / 100));
                    const discountedPrice = priceToUse - discountAmount;

                    return {
                        ...item,
                        quantity: item.quantity + receivedItem.quantity,
                        manualPrice: receivedItem.manualPrice,
                        total: (item.quantity + receivedItem.quantity) * discountedPrice,
                        discountFlat: flatDiscount,
                        discountPercentage: percentageDiscount,
                    };
                }
                return item;
            });
        } else {
            // Add new item
            console.log("Adding new item to delivery cart", receivedItem);
            const itemToAdd = {
                ...receivedItem
            };
            return [itemToAdd, ...prevDelivery.items];
        }
    };
    
    const addToDelivery = (receivedItem: ReceivedItem) => {

        setDelivery(prevDelivery => {
            const updatedItems = updateDeliveryItems(prevDelivery, receivedItem);
            console.log("manual price", updatedItems[0].manualPrice);
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
