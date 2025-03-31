import { View } from "react-native";
import PurchaseOrderList from "@/src/features/purchase-order-feature/components/purchase-order-list";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";
import { useEffect } from "react";

export default function PurchaseOrdersScreen() {

    const { purchaseOrders, reloadPurchaseOrders } = usePurchaseOrder();

    useEffect(() => {
        if (purchaseOrders.length === 0) {
            reloadPurchaseOrders();
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <PurchaseOrderList
                poItems={purchaseOrders}
                onReceivePo={() => {}}
                onViewDetails={() => {}}
            />
        </View>
    );
    
}


