import React, { createContext, useContext, useState } from 'react';
import { Delivery } from '@/entities/delivery';
import { ReceivedDelivery } from '@/entities/received-delivery';
import { DeliveryRepository } from '@/repositories/delivery-repository';
import { DeliveryLineRepository } from '@/repositories/delivery-line-repository';

interface DeliveryContextType {
    delivery: Delivery | null;
    initializeDelivery: (newDelivery: Delivery) => void;
    updateReceivedDelivery: (receivedDelivery: ReceivedDelivery) => void;
    getDelivery: () => Delivery | null;
    finalizeDelivery: (receivedDelivery: ReceivedDelivery) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: React.ReactNode }) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);

    const [receivedDelivery, setReceivedDelivery] = useState<ReceivedDelivery | null>(null);

    const deliveryRepository = new DeliveryRepository();
    const deliveryLineRepository = new DeliveryLineRepository();

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
            total: receivedDelivery.total
        });

        // const updatedDelivery: Delivery = {
        //     ...delivery,
        //     total: receivedDelivery.total
        // };

        setReceivedDelivery(receivedDelivery);

        // console.log('Received Delivery:', receivedDelivery.total)
        // console.log('Delivery:', delivery);
        // console.log('Updated Delivery:', updatedDelivery);
    };

    const getDelivery = () => {
        return delivery;
    };

    const finalizeDelivery = async (receivedDelivery: ReceivedDelivery) => {
        if (!delivery) {
            console.error('No delivery to finalize');
            return;
        }

        try{

            const updatedDelivery: Delivery = {
                ...delivery,
                total: receivedDelivery.total
            };

            const jsonReturn = await deliveryRepository.createDelivery(updatedDelivery);

            console.log('Delivery finalized with ID:', jsonReturn.deliveryId);

            const updatedReceivedDelivery: ReceivedDelivery ={...receivedDelivery, deliveryId: jsonReturn.deliveryId};

            const resultDeliveryLines = await deliveryLineRepository.createDeliveryLines(updatedReceivedDelivery);

            console.log('Delivery finalized with ID:', jsonReturn.deliveryId);
            console.log('Delivery lines created:', resultDeliveryLines);

            // console.log('Finalized Delivery:', updatedDelivery);
            // console.log('Finalized Received Delivery:', updatedReceivedDelivery);
            // console.log('delivery items:', updatedReceivedDelivery.items);
            setDelivery(null);
            setReceivedDelivery(null);
        } catch (error) {
            console.error('Error finalizing delivery:', error); 

    
        };


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
