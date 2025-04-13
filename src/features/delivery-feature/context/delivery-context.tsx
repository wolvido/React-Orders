import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Delivery } from '@/src/entities/delivery/type/delivery';
import { ReceivedDelivery } from '@/src/entities/received-delivery/type/received-delivery';
import { DeliveryRepository } from '@/src/infrastructure/repositories/delivery-repository';
import { DeliveryLineRepository } from '@/src/infrastructure/repositories/delivery-line-repository';

interface DeliveryContextType {
    delivery: Delivery | null;
    initializeDelivery: (newDelivery: Delivery) => void;
    updateReceivedDelivery: (receivedDelivery: ReceivedDelivery) => void;
    getDelivery: () => Delivery | null;
    finalizeDelivery: (receivedDeliveryParam?: ReceivedDelivery) => Promise<{success: boolean, message: string} | undefined>;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
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

        setReceivedDelivery(receivedDelivery);
    };

    const getDelivery = () => {
        return delivery;
    };

    const finalizeDelivery = async (receivedDeliveryParam?: ReceivedDelivery) => {
        if (!delivery) {
            console.error('No delivery to finalize');
            return {
                success: false,
                message: 'No delivery to finalize'
            };
        }

        const receivedDeliveryToFinalize = receivedDelivery || receivedDeliveryParam;

        if (!receivedDeliveryToFinalize) {
            console.error('No received delivery to finalize');
            return {
                success: false,
                message: 'No received delivery to finalize'
            };
        }

        //assign deliveredBy to receivedDelivery lines
        receivedDeliveryToFinalize.deliveredBy = delivery.deliveredBy;

        try{
            // add the total and items count to the delivery
            const updatedDelivery: Delivery = {
                ...delivery,
                total: receivedDeliveryToFinalize.total,
                items: receivedDeliveryToFinalize.items.length,
            };

            const jsonReturn = await deliveryRepository.createDelivery(updatedDelivery);

            const updatedReceivedDelivery: ReceivedDelivery = {
                ...receivedDeliveryToFinalize, 
                deliveryId: jsonReturn.deliveryId
            };

            const resultDeliveryLines = await deliveryLineRepository.createDeliveryLines(updatedReceivedDelivery);

            console.log('Delivery finalized with ID:', jsonReturn.deliveryId);
            console.log('Delivery lines created:', resultDeliveryLines);

            setDelivery(null);
            setReceivedDelivery(null);

            if ((jsonReturn.deliveryId > 0) && (resultDeliveryLines.items.length > 0)) {
                return {
                    success: true,
                    message: 'Delivery Finalized with ID: ' + jsonReturn.deliveryId
                };
            }

        } catch (error) {
            console.error('Error finalizing delivery:', error); 
            return {
                success: false,
                message: `Error finalizing delivery: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
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
