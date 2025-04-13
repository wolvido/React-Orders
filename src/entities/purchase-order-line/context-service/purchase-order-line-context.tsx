import { createContext, ReactNode, useContext } from "react";
import { PurchaseOrderLine } from "../type/purchase-order-line";
import { PurchaseOrderLineRepository } from "@/src/infrastructure/repositories/purchase-order-line-repository";

interface PurchaseOrderLineContextType {
    getPurchaseOrderLinesById: (PurchaseOrderId: number) => Promise<PurchaseOrderLine[]>;
}

const PurchaseOrderLineContext = createContext<PurchaseOrderLineContextType | undefined>(undefined);

export const PurchaseOrderLineProvider = ({ children }: { children: ReactNode }) => {

    const purchaseOrderLineRepo = new PurchaseOrderLineRepository();

    const getPurchaseOrderLinesById = async (purchaseOrderId: number): Promise<PurchaseOrderLine[]> => {
        try {
            const purchaseOrderLines = await purchaseOrderLineRepo.getByPoId(purchaseOrderId);

            if (!purchaseOrderLines) {
                console.warn(`No purchase order lines found for ID: ${purchaseOrderId}`);
                return [];
            }

            return purchaseOrderLines;
        } catch (error) {
            console.error("Error fetching purchase order lines:", error);
            throw error;
        }
    };

    return (
        <PurchaseOrderLineContext.Provider value={{
            getPurchaseOrderLinesById
        }}>
            {children}
        </PurchaseOrderLineContext.Provider>
    );
}

export const usePurchaseOrderLine = () => {
    const context = useContext(PurchaseOrderLineContext);
    if (!context) {
        throw new Error("usePurchaseOrderLine must be used within a PurchaseOrderLineProvider");
    }
    return context;
};
