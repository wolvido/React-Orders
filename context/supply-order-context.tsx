import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Inventory } from '@/models/inventory';
import { Cart } from '@/models/cart';
import { SupplyOrder } from '@/models/supply-order';
import { InventoryContext } from './inventory-context';

interface SupplyOrderContextType {
    supplyOrder: SupplyOrder;
    addInventoryByQuantity: (inventory: Inventory) => void;
    handleSubmit: () => Promise<void>;
    setOrder: (order: SupplyOrder) => void;
};

export const SupplyOrderContext = createContext<SupplyOrderContextType>({
    supplyOrder: {id: 0, supplier: "", supplyOrderItems: []},
    addInventoryByQuantity: (inventory: Inventory) => {},
    handleSubmit: async () => {},
    setOrder: (order: SupplyOrder) => {}
});

function SupplyOrderContextProvider({initialValue, children}: {initialValue: SupplyOrder, children: ReactNode}) {
    const [supplyOrder, setSupplyOrder] = useState(initialValue);

    //coupled with inventory context, need to decoupe later when app gets larger
    const inventoryContext = useContext(InventoryContext);

    const updateSupplyOrderQuantity = (inventory: Inventory, newQuantity: number) => {
        const itemId = inventory.item.id;

        const updatedInventoryItems = supplyOrder.supplyOrderItems.map((inventory) => {
            if (inventory.item.id === itemId) {
                return { ...inventory, quantity: Number(inventory.quantity) + Number(newQuantity)};
            }
            return inventory;
        });

        return updatedInventoryItems;
    };

    const addInventoryByQuantity = (inventory: Inventory) => {
        const itemId = inventory.item.id;
        const supplyOrderItems = supplyOrder.supplyOrderItems;
        const itemIds = supplyOrderItems.map((inventory) => inventory.item.id);
        const itemIndex = itemIds.indexOf(itemId);

        if (itemIndex !== -1) {
            const updatedInventoryQuantity = updateSupplyOrderQuantity(supplyOrder.supplyOrderItems[itemIndex], inventory.quantity);
            setSupplyOrder({ ...supplyOrder, supplyOrderItems: updatedInventoryQuantity });
        } else {
            setSupplyOrder({ ...supplyOrder, supplyOrderItems: [...supplyOrder.supplyOrderItems, { ...inventory }] });
        }
    };

    const handleSubmit = async () => {
        console.log(supplyOrder);
        inventoryContext.increaseInventory(supplyOrder);

        setSupplyOrder({id: 0, supplier: "", supplyOrderItems: []});
    };

    const setOrder = (order: SupplyOrder) => {
        setSupplyOrder(order);
    };

    const value = {
        supplyOrder,
        addInventoryByQuantity,
        handleSubmit,
        setOrder
    };


    return (
        <SupplyOrderContext.Provider value={value}>
            {children}
        </SupplyOrderContext.Provider>
    );
}

export default SupplyOrderContextProvider;