import { createContext, useState } from 'react';
import { Inventory } from '../models/inventory';
import { Cart } from '@/models/cart';
import { SupplyOrder } from '@/models/supply-order';

//context definition
interface InventoryContextType {
    items: Inventory[];
    addInvetoryByQuantity: (inventory: Inventory) => void;
    getAllInventory: () => Inventory[];
    reduceInventory: (cart: Cart) => void;
    increaseInventory: (supplyOrder: SupplyOrder) => void;
};

//inventory context
export const InventoryContext = createContext<InventoryContextType>({
    items: [],
    addInvetoryByQuantity: (inventory: Inventory) => {},
    getAllInventory: () => [],
    reduceInventory: (cart: Cart) => {},
    increaseInventory: (supplyOrder: SupplyOrder) => {}
});

function InventoryContextProvider({children, initialDatabase}: {children: React.ReactNode, initialDatabase: Inventory[]}) {
    const [database, setDatabase] = useState<Inventory[]>(initialDatabase);

    const updateInventoryQuantity = (inventory: Inventory, newQuantity: number) => {
        const itemId = inventory.item.id;

        const updatedInventoryItems = database.map((inventory) => {
            if (inventory.item.id === itemId) {
                return { ...inventory, quantity: Number(inventory.quantity) + Number(newQuantity)};
            }
            return inventory;
        });

        return updatedInventoryItems; //returns full database with updated quantity of the selected inventory item
    }

    const addInvetoryByQuantity = (inventory: Inventory) => {
        const itemId = inventory.item.id;
        const databaseItems = database;
        const itemIds = databaseItems.map((inventory) => inventory.item.id);
        const itemIndex = itemIds.indexOf(itemId);

        if (itemIndex !== -1) {
            const updatedInventoryQuantity = updateInventoryQuantity(database[itemIndex], inventory.quantity);

            setDatabase(updatedInventoryQuantity);
        } else {
            setDatabase([...database, { ...inventory}]);
        }
    }

    const getAllInventory = () => {
        return database;
    }

    const reduceInventory = (cart: Cart) => {
        //get the item ids from the cart
        const cartItemIds = cart.cartItems.map((cartItem) => cartItem.item.id);

        //loop through all inventory items
        const updatedInventory = database.map((inventory) => {
            //check if the item id is in the cart
            if (cartItemIds.includes(inventory.item.id)) {

                //get the cart item with the same item id
                const cartItem = cart.cartItems.find((cartItem) => cartItem.item.id === inventory.item.id);

                //reduce the inventory quantity by the cart item quantity
                if (cartItem) {
                    return { ...inventory, quantity: Number(inventory.quantity) - Number(cartItem.quantity) };
                }
            }
            return inventory;
        });

        setDatabase(updatedInventory);
    }

    const increaseInventory = (supplyOrder: SupplyOrder) => {
        //get the item ids from the supply order
        const supplyOrderItemIds = supplyOrder.supplyOrderItems.map((supplyOrderItem) => supplyOrderItem.item.id);

        //loop through all inventory items
        const updatedInventory = database.map((inventory) => {
            //check if the item id is in the supply order
            if (supplyOrderItemIds.includes(inventory.item.id)) {

                //get the supply order item with the same item id
                const supplyOrderItem = supplyOrder.supplyOrderItems.find((supplyOrderItem) => supplyOrderItem.item.id === inventory.item.id);

                //increase the inventory quantity by the supply order item quantity
                if (supplyOrderItem) {
                    return { ...inventory, quantity: Number(inventory.quantity) + Number(supplyOrderItem.quantity) };
                }
            }
            return inventory;
        });

        setDatabase(updatedInventory);
    }

    const value = {
        items: database,
        addInvetoryByQuantity: addInvetoryByQuantity,
        getAllInventory: getAllInventory,
        reduceInventory: reduceInventory,
        increaseInventory: increaseInventory
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
}

export default InventoryContextProvider;