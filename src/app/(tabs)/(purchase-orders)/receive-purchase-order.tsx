import { useAuth } from "@/src/features/auth-feature/context/auth-context";
import AddDeliveryForm from "@/src/features/delivery-feature/components/forms/add-delivery-form";
import { PurchaseOrderDetails } from "@/src/features/purchase-order-feature/components/PO-details";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";
import StepIndicator from "@/src/features/step-indicator-feature/components/order-step-indicator";
import { Text } from "react-native-paper";
import poSteps from "./po-steps-label";

export default function ReceivePurchaseOrderScreen() {

    const { selectedPurchaseOrder, PurchaseOrderToDelivery } = usePurchaseOrder();

    const { user } = useAuth();

    // Check if selectedPurchaseOrder is null or undefined before proceeding
    if (!selectedPurchaseOrder) {
        return <Text>Error: No purchase order selected</Text>;
    }

    const deliveryDetails = PurchaseOrderToDelivery(selectedPurchaseOrder);

    return (
        <>
        <StepIndicator currentStep={1} steps={poSteps} />
        <PurchaseOrderDetails purchaseOrder={selectedPurchaseOrder} />

        <AddDeliveryForm
            suppliers={deliveryDetails.supplier ? [deliveryDetails.supplier] : []}

            onSubmit={(delivery) => {
                console.log("Delivery submitted:", delivery);
            }}

            existingPartialDelivery={deliveryDetails} 
            currentUser={user || undefined}
        />

        </>
    );

};