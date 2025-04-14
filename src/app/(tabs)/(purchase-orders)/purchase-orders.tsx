import { View } from "react-native";
import PurchaseOrderList from "@/src/features/purchase-order-feature/components/purchase-order-list";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";
import { Suspense, useEffect, useState } from "react";
import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { router } from "expo-router";
import { usePurchaseOrderLine } from "@/src/entities/purchase-order-line/context-service/purchase-order-line-context";
import PurchaseOrderLineList from "@/src/features/purchase-order-feature/components/display/purchase-orderline-list";
import { EmptyState } from "@/src/shared/ui/empty-state";
import { Portal } from "react-native-paper";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";

export default function PurchaseOrdersScreen() {
    const { purchaseOrders, reloadPurchaseOrders, getPurchaseOrderById, setSelectedPurchaseOrder } = usePurchaseOrder();
    const { getPurchaseOrderLinesById } = usePurchaseOrderLine();

    const [showDetails, setShowDetails] = useState(false);
    const [purchaseOrderLines, setPurchaseOrderLines] = useState<PurchaseOrderLine[]>([]);

    useEffect(() => {
        if (purchaseOrders.length === 0) {
            reloadPurchaseOrders();
        }
    }, []);

    // receive PO
    const [purchaseOrderToReceive, setPurchaseOrderToReceive] = useState<PurchaseOrder | null>(null);
    const handleReceivePo = async (id: number) => {

        const purchaseOrder = await getPurchaseOrderById(id);

        if (!purchaseOrder) {
            console.error(`Purchase order with id ${id} not found`);

            return;
        }

        setPurchaseOrderToReceive(purchaseOrder);

        console.log('Receive PO:', id);
    };

    //navigate to PO receive screen
    useEffect(() => {
        if (purchaseOrderToReceive) {
            setSelectedPurchaseOrder(purchaseOrderToReceive);
            router.push('/receive-purchase-order');
        }
    }, [purchaseOrderToReceive]);

    //view details of PO
    const handleViewDetails = async (id: number) => {

        const lines = await getPurchaseOrderLinesById(id);
        if (!lines) {
            console.error(`Purchase order lines with id ${id} not found`);
            return;
        }

        setPurchaseOrderLines(lines);
        setShowDetails(true);

    };


    return (
        <View style={{ flex: 1 }}>
            <PurchaseOrderList
                poItems={purchaseOrders}
                onReceivePo={handleReceivePo}
                onViewDetails={handleViewDetails}
            />

            <Suspense
                fallback={<EmptyState 
                    title="Awaiting Data..."
                    subtitle="PO details will be available shortly"
                    loading={true}
                />}
            >
                <Portal>
                    <PurchaseOrderLineList 
                        poItems={purchaseOrderLines} 
                        isVisible={showDetails} 
                        onDismiss={() => setShowDetails(false)}
                    />
                </Portal>
            </Suspense>
        </View>
    );
    
}


