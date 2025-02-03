
import StepIndicator from "@/components/order-step-indicator";
import receivePOSteps from "./receive-PO-steps";
import { View } from "react-native";
import PurchaseOrderForm from "@/components/purchase-order-form";
import { ReceiveDeliveryCartComponent } from "@/components/receive-delivery-cart";
import { purchaseOrders } from "@/dummy-data/dummy-purchase-orders";
import { ReceivedDelivery } from "@/entities/received-delivery";


export default function AddPurchaseOrderItemsScreen() {
    
    const handleDeliveryFinalized = (selectedDelivery: ReceivedDelivery) => {
        console.log(selectedDelivery);
    };

    return (
        <View>
            <StepIndicator currentStep={2} backPath="../receive-order" steps={receivePOSteps}/>
            <ReceiveDeliveryCartComponent 
                receivedDelivery={purchaseOrders[0].delivery.receivedItems}
                onProceed={handleDeliveryFinalized}
                onError={(message) => {
                    // Handle error messages
                    console.error(message);
                }}
            />
        </View>
    );
}