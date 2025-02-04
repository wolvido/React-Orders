import React, { createContext, useContext, useState } from 'react';
import { PurchaseOrder } from '@/entities/purchase-order';
import { Delivery } from '@/entities/delivery';
import { ReceivedDelivery } from '@/entities/received-delivery';

interface PurchaseOrderContextType {
    purchaseOrder: PurchaseOrder | null;
    initializePurchaseOrder: (newPO: PurchaseOrder) => void;
    updateDelivery: (delivery: Delivery) => void;
    updateReceivedDelivery: (receivedDelivery: ReceivedDelivery) => void;
    finalizePurchaseOrder: () => void;
}

export const PurchaseOrderContext = createContext<PurchaseOrderContextType | undefined>(undefined);

export const PurchaseOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);

    const initializePurchaseOrder = (newPO: PurchaseOrder) => {
        if (!purchaseOrder) {
            setPurchaseOrder(newPO);
            return;
        }

        // Update existing PO while preserving non-null values
        const updatedPO = { ...purchaseOrder };
        
        Object.keys(newPO).forEach((key) => {
            const typedKey = key as keyof PurchaseOrder;
            if (newPO[typedKey] !== null) {
                (updatedPO[typedKey] as any) = newPO[typedKey];
            }
        });

        setPurchaseOrder(updatedPO);
    };

    const updateDelivery = (delivery: Delivery) => {
        if (!purchaseOrder) return;

        setPurchaseOrder({
            ...purchaseOrder,
            delivery: delivery
        });
    };

    const updateReceivedDelivery = (receivedDelivery: ReceivedDelivery) => {
        if (!purchaseOrder || !purchaseOrder.delivery) return;

        const updatedDelivery = {
            ...purchaseOrder.delivery,
            receivedItems: receivedDelivery,
            total: receivedDelivery.total
        };

        setPurchaseOrder({
            ...purchaseOrder,
            delivery: updatedDelivery
        });
    };

    const finalizePurchaseOrder = () => {
        if (purchaseOrder) {
            console.log('Purchase Order:', purchaseOrder);
            // API calls will go here later
            setPurchaseOrder(null);
        }
    };

    const value = {
        purchaseOrder,
        initializePurchaseOrder,
        updateDelivery,
        updateReceivedDelivery,
        finalizePurchaseOrder
    };

    return (
        <PurchaseOrderContext.Provider value={value}>
            {children}
        </PurchaseOrderContext.Provider>
    );
};

export const usePurchaseOrder = () => {
    const context = useContext(PurchaseOrderContext);
    if (context === undefined) {
        throw new Error('usePurchaseOrder must be used within a PurchaseOrderProvider');
    }
    return context;
};
