
import StepIndicator from "@/components/order-step-indicator";
import receivePOSteps from "./receive-PO-steps";
import { View } from "react-native";
import PurchaseOrderForm from "@/components/purchase-order-form";
import { ReceiveDeliveryCartComponent } from "@/components/receive-delivery-cart";
import { purchaseOrders } from "@/dummy-data/dummy-purchase-orders";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { usePurchaseOrder } from "@/context/purchase-order-context";
import { router } from "expo-router";
import { Button } from "react-native-paper";


export default function AddPurchaseOrderItemsScreen() {
    
    const { purchaseOrder, updateReceivedDelivery, finalizePurchaseOrder } = usePurchaseOrder();

    const handleDeliveryFinalized = (selectedDelivery: ReceivedDelivery) => {
        updateReceivedDelivery(selectedDelivery);
        router.push("./purchase-orders");
        finalizePurchaseOrder();
    };

    return (
        <View>
            <StepIndicator currentStep={2} backPath="./receive-order" steps={receivePOSteps}/>
            <ReceiveDeliveryCartComponent 
                receivedDelivery={purchaseOrder?.delivery?.receivedItems ?? { total: 0, items: [] }}
                onProceed={handleDeliveryFinalized}
                onError={(message) => {
                    console.error(message);
                }}
            />

            {/* <Button mode="contained" onPress={finalizePurchaseOrder}>
                Finalize Purchase Order
            </Button> */}

        </View>
    );
}