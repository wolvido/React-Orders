import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { PurchaseOrderRepository } from "@/src/infrastructure/repositories/purchase-order-repository";
import { createContext, ReactNode, useContext, useState } from "react";
import { Delivery } from "@/src/entities/delivery/type/delivery";

interface PurchaseOrderContextType {
    selectedPurchaseOrder: PurchaseOrder | null;
    purchaseOrders: PurchaseOrder[];
    reloadPurchaseOrders: () => Promise<void>;
    getPurchaseOrderById: (id: number) => Promise<PurchaseOrder | undefined>;
    setSelectedPurchaseOrder: (purchaseOrder: PurchaseOrder) => void;
    PurchaseOrderToDelivery: (purchaseOrder: PurchaseOrder) => Partial<Delivery>;
    isLoading: boolean;
}

const PurchaseOrderContext = createContext<PurchaseOrderContextType | undefined>(undefined);

export const PurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrder | null>(null);
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const purchaseOrderRepository = new PurchaseOrderRepository(); // Assuming you have a PurchaseOrderRepository

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

    const PurchaseOrderToDelivery = (purchaseOrder: PurchaseOrder): Partial<Delivery> => {
        return {
            id: purchaseOrder.deliveryId || 0,

            // receiptNumber: string; not in purchase order, added on user input.

            // supplier: Supplier;
            supplier: purchaseOrder.supplier,

            // deliveryDate: Date; //user input, date now by default.

            // deliveredBy: string; //user input.

            // total: number; //to be calculated from PO cart.

            // handledBy: string; //not in PO desktop, but will be added by user in mobile.

            // creationDate: Date; //created as soon as PO is received or partial received.
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
                PurchaseOrderToDelivery,
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