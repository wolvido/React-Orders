import { View } from "react-native";
import PurchaseOrderList from "@/src/features/purchase-order-feature/components/purchase-order-list";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";
import { useEffect, useState } from "react";
import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { router } from "expo-router";

export default function PurchaseOrdersScreen() {

    const [ isLoading, setIsLoading ] = useState(false);

    const { purchaseOrders, reloadPurchaseOrders, getPurchaseOrderById, setSelectedPurchaseOrder } = usePurchaseOrder();
    useEffect(() => {
        if (purchaseOrders.length === 0) {
            reloadPurchaseOrders();
        }
    }, []);

    // receive PO
    const [purchaseOrderToReceive, setPurchaseOrderToReceive] = useState<PurchaseOrder | null>(null);
    const handleReceivePo = async (id: number) => {
        setIsLoading(true);

        const purchaseOrder = await getPurchaseOrderById(id);

        if (!purchaseOrder) {
            console.error(`Purchase order with id ${id} not found`);
            setIsLoading(false);
            return;
        }

        setPurchaseOrderToReceive(purchaseOrder);
        setIsLoading(false);

        console.log('Receive PO:', id);
    };

    //navigate to PO receive screen
    useEffect(() => {
        if (purchaseOrderToReceive) {
            setSelectedPurchaseOrder(purchaseOrderToReceive);
            router.push('/receive-purchase-order');
        }
    }, [purchaseOrderToReceive]);

    return (
        <View style={{ flex: 1 }}>
            <PurchaseOrderList
                poItems={purchaseOrders}
                onReceivePo={handleReceivePo}
                onViewDetails={() => {}}
            />
        </View>
    );
    
}


