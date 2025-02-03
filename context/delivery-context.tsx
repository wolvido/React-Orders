import React, { createContext, useContext, useState } from 'react';
import { Delivery } from '@/entities/delivery';
import { ReceivedDelivery } from '@/entities/received-delivery';

interface DeliveryContextType {
    delivery: Delivery | null;
    initializeDelivery: (newDelivery: Delivery) => void;
    updateReceivedDelivery: (receivedDelivery: ReceivedDelivery) => void;
    getDelivery: () => Delivery | null;
    finalizeDelivery: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: React.ReactNode }) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);

    const initializeDelivery = (newDelivery: Delivery) => {
        if (!delivery) {
            setDelivery(newDelivery);
            return;
        }

        // Update existing delivery while preserving non-null values
        const updatedDelivery = { ...delivery };
        
        Object.keys(newDelivery).forEach((key) => {
            const typedKey = key as keyof Delivery;
            if (newDelivery[typedKey] !== null) {
                (updatedDelivery[typedKey] as any) = newDelivery[typedKey];
            }
        });

        setDelivery(updatedDelivery);
    };

    const updateReceivedDelivery = (receivedDelivery: ReceivedDelivery) => {
        if (!delivery) return;

        setDelivery({
            ...delivery,
            receivedItems: receivedDelivery,
            total: receivedDelivery.total
        });
    };

    const getDelivery = () => {
        return delivery;
    };

    const finalizeDelivery = () => {
        if (delivery) {
            console.log('Delivery:', delivery);
            //api calls later
            
            setDelivery(null);
        }
    };

    const value = {
        delivery,
        initializeDelivery,
        updateReceivedDelivery,
        getDelivery,
        finalizeDelivery
    };

    return (
        <DeliveryContext.Provider value={value}>
            {children}
        </DeliveryContext.Provider>
    );
};

export const useDelivery = () => {
    const context = useContext(DeliveryContext);
    if (context === undefined) {
        throw new Error('useDelivery must be used within a DeliveryProvider');
    }
    return context;
};
