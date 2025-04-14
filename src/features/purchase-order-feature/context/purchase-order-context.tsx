import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { PurchaseOrderRepository } from "@/src/infrastructure/repositories/purchase-order-repository";
import { createContext, ReactNode, useContext, useState } from "react";
import { Delivery } from "@/src/entities/delivery/type/delivery";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { PurchaseOrderLineRepository } from "@/src/infrastructure/repositories/purchase-order-line-repository";

interface PurchaseOrderContextType {
    selectedPurchaseOrder: PurchaseOrder | null;
    purchaseOrders: PurchaseOrder[];
    reloadPurchaseOrders: () => Promise<void>;
    getPurchaseOrderById: (id: number) => Promise<PurchaseOrder | undefined>;
    setSelectedPurchaseOrder: (purchaseOrder: PurchaseOrder) => void;
    purchaseOrderToDelivery: (purchaseOrder: PurchaseOrder) => Partial<Delivery>;
    finalizePurchaseOrderUpdate: (purchaseOrderLines: PurchaseOrderLine[]) => Promise<{success: boolean, message: string} | undefined>;
    isLoading: boolean;
}

const PurchaseOrderContext = createContext<PurchaseOrderContextType | undefined>(undefined);

export const PurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrder | null>(null);
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const purchaseOrderRepository = new PurchaseOrderRepository();
    const purchaseOrderLineRepository = new PurchaseOrderLineRepository();

    const loadPurchaseOrders = async () => {
        setIsLoading(true);
        try {
            const orders = await purchaseOrderRepository.getAll();
            setPurchaseOrders(orders);
        } catch (error) {
            console.error("Error loading purchase orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const reloadPurchaseOrders = async () => {
        await loadPurchaseOrders();
    };

    const getPurchaseOrderById = async (id: number): Promise<PurchaseOrder | undefined> => {
        try{
            const purchaseOrder = await purchaseOrderRepository.getById(id);
            if (purchaseOrder) {
                return purchaseOrder;
            } else {
                console.warn(`Purchase order with id ${id} not found`);
                return undefined;
            }
        } catch (error) {
            console.error(`Error fetching purchase order with id ${id}:`, error);
            throw error;
        }
    };

    /**
     * Converts a purchase order to a partial delivery form.
     * @param purchaseOrder purchase order form.
     * @returns delivery partial form with the purchase order data.
     */
    const purchaseOrderToDelivery = (purchaseOrder: PurchaseOrder): Partial<Delivery> => {
        return {
            id: purchaseOrder.deliveryId || 0,
            supplier: purchaseOrder.supplier,
        };
    };

    const finalizePurchaseOrderUpdate = async (purchaseOrderLines: PurchaseOrderLine[]): Promise<{success: boolean, message: string} | undefined> => {
        if (!selectedPurchaseOrder) {
            console.error('No purchase order to finalize');
            return {
                success: false,
                message: 'No purchase order to finalize'
            };
        }

        // Check if purchase order lines are empty
        if (purchaseOrderLines.length <= 0) {
            return {
                success: false,
                message: 'No purchase order products to update'
            };
        }

        await Promise.all(purchaseOrderLines.map(async (poLine) => {
            if (poLine.orderedQuantity === undefined || poLine.orderedQuantity == 0) {
                console.warn(`Purchase order line with id ${poLine.id} has no ordered quantity`);
                return;
            }

            if ((poLine.receivedQuantity ?? 0) > 0) {
                poLine.isReceived = true;
            }
            if ((poLine.receivedQuantity ?? 0) >= (poLine.orderedQuantity ?? 0)) {
                poLine.isProcessed = true;
            } else {
                poLine.isProcessed = false;
            }
        
            try {
                const result = await purchaseOrderLineRepository.updatePoLine(poLine);
                console.log('Purchase order line updated:', result);
            } catch (error) {
                console.error('Error updating purchase order line:', error);
                throw error; // Re-throw if you want to handle it in the calling function
            }
        }));

        // after updating the purchase order lines with await, check if all lines are complete
        const linesAfterUpdate = await purchaseOrderLineRepository.getByPoId(selectedPurchaseOrder.id);
        const allLinesComplete = linesAfterUpdate.every(line => line.isProcessed === true);
        selectedPurchaseOrder.isComplete = allLinesComplete;

        if (allLinesComplete) {
            try {
                const updatedPurchaseOrder = await purchaseOrderRepository.update(selectedPurchaseOrder);
                console.log('Purchase order updated:', updatedPurchaseOrder);
                return {
                    success: true,
                    message: 'Purchase order updated successfully'
                };

            } catch (error) {
                console.error('Error updating purchase order:', error);
                throw error; // Re-throw if you want to handle it in the calling function
            }
        };

        return {
            success: true,
            message: 'Purchase order updated successfully'
        };
    };

    return (
        <PurchaseOrderContext.Provider
            value={{
                selectedPurchaseOrder,
                purchaseOrders,
                reloadPurchaseOrders,
                getPurchaseOrderById,
                setSelectedPurchaseOrder,
                purchaseOrderToDelivery,
                finalizePurchaseOrderUpdate,
                isLoading,
            }}
        >
            {children}
        </PurchaseOrderContext.Provider>
    );
};

export function usePurchaseOrder(){
    const context = useContext(PurchaseOrderContext);
    if (!context) {
        throw new Error("usePurchaseOrder must be used within a PurchaseOrderProvider");
    }
    return context;
}