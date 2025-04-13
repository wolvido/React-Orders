import { Product } from "@/src/entities/product/type/product";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { createContext, ReactNode, useContext, useEffect, useState} from "react";

interface PurchaseOrderListingContextType {
    purchaseOrderListing: PurchaseOrderLine[];
    setInitialPOListing: (initialPoLines: PurchaseOrderLine[]) => void;
    clearPurchaseOrderListing: () => void;
    addToCart: (poLine: PurchaseOrderLine) => void;
    removeFromCart: (poLine: PurchaseOrderLine) => void;
    restorePOLineByProduct: (product: Product) => void;
}

const PurchaseOrderListingContext = createContext<PurchaseOrderListingContextType | undefined>(undefined);

export const PurchaseOrderListingProvider = ( {children}: {children: ReactNode}) => {

    const [ purchaseOrderListing, setPurchaseOrderListing] = useState<PurchaseOrderLine[]>([]);
    const [ initialPurchaseOrderListing, setInitialPurchaseOrderListing] = useState<PurchaseOrderLine[]>([]);

    /**
     * setInitialPOListing will only set if the purchaseOrderListing is empty.
     */
    const setInitialPOListing = (initialPoLines: PurchaseOrderLine[]) => {
        console.log("current po list length:",purchaseOrderListing.length)

        //only set if the purchaseOrderListing is empty
        if (purchaseOrderListing.length == 0) {
            setInitialPurchaseOrderListing(initialPoLines);
            setPurchaseOrderListing(initialPoLines);
        }
    };

    const clearPurchaseOrderListing = () => {
        setPurchaseOrderListing([]);
        setInitialPurchaseOrderListing([]);
    }

    /**
     * Handles the existing item in the purchase order listing with the input item. It does not add the item to the cart.
     * This function does not have any cart logic, it only handles the item in the purchaseOrderListing.
     * Handle cart logic separately.
     * @param poLine Purchase order line to be updated.
     */
    const addToCart = (poLine: PurchaseOrderLine) => {
        poLine.isReceived = true;

        if (poLine.orderedQuantity == null || poLine.orderedQuantity == undefined) {
            console.warn("PurchaseOrderLine ordered quantity is null or undefined. Cannot add to cart an empty line.");
            return;
        }

        if((poLine.receivedQuantity ?? 0) >= poLine.orderedQuantity ){
            poLine.isProcessed = true;
        }
        else{
            poLine.isProcessed = false;
        }

        //replace the existing item with the input item
        const existingItemIndex = purchaseOrderListing.findIndex(item => item.id === poLine.id);
        if (existingItemIndex >= 0) {
            setPurchaseOrderListing(prev => {
                const updatedListing = [...prev]; // Create a copy of the previous array
                updatedListing[existingItemIndex] = poLine;  // Replace the item at that index
                return updatedListing; //return the updated state
            });
        }
        else {
            setPurchaseOrderListing(prev => [...prev, poLine]);
        }

    };

    /**
     * Restores the purchase order line in the purchase order listing with its initial state. It does not remove the item from the cart.
     * This function does not have any cart logic, it only restores the item in the purchaseOrderListing.
     * @param poLine purchase order line to be restored to initial state.
     */
    const removeFromCart = (poLine: PurchaseOrderLine) => {
        //grab the existing item from the initialPurchaseOrderListing
        const existingItemIndex = initialPurchaseOrderListing.findIndex(item => item.id === poLine.id);

        //restore using the initialPurchaseOrderListing
        if (existingItemIndex >= 0) {
            const initialPoLine = initialPurchaseOrderListing[existingItemIndex];
            setPurchaseOrderListing(prev => {
                const updatedListing = [...prev]; // Create a copy of the previous array
                updatedListing[existingItemIndex] = initialPoLine; // Update the copy
                return updatedListing; // Return the new array
            });
        }
    };

    const restorePOLineByProduct = (product: Product) => {
        const existingItemIndex = purchaseOrderListing.findIndex(item => item.productId === product.id);

        if (existingItemIndex >= 0) {
            const poLine = purchaseOrderListing[existingItemIndex];

            removeFromCart(poLine);
        }

    };

    return (
        <PurchaseOrderListingContext.Provider value={{
            purchaseOrderListing,
            setInitialPOListing,
            clearPurchaseOrderListing,
            addToCart,
            removeFromCart,
            restorePOLineByProduct
        }}>
            {children}
        </PurchaseOrderListingContext.Provider>
    );
};

export const usePurchaseOrderListing = () => {
    const context = useContext(PurchaseOrderListingContext);
    if (!context) {
        throw new Error("usePurchaseOrderListing must be used within a PurchaseOrderListingProvider");
    }
    return context;
};
