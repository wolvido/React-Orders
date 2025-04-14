import { useAuth } from "@/src/features/auth-feature/context/auth-context";
import AddDeliveryForm from "@/src/features/delivery-feature/components/forms/add-delivery-form";
import { PurchaseOrderDetails } from "@/src/features/purchase-order-feature/components/PO-details";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";
import StepIndicator from "@/src/features/step-indicator-feature/components/order-step-indicator";
import { Text } from "react-native-paper";
import poSteps from "./po-steps-label";
import { useDelivery } from "@/src/features/delivery-feature/context/delivery-context";
import { Delivery } from "@/src/entities/delivery/type/delivery";
import { router } from "expo-router";
import { usePurchaseOrderListing } from "@/src/features/purchase-order-feature/context/purchase-order-listing-context";
import { usePurchaseOrderLine } from "@/src/entities/purchase-order-line/context-service/purchase-order-line-context";
import { useEffect } from "react";

export default function ReceivePurchaseOrderScreen() {

    const { selectedPurchaseOrder, purchaseOrderToDelivery } = usePurchaseOrder();
    const { initializeDelivery } = useDelivery();
    const { user } = useAuth();

    const { setInitialPOListing } = usePurchaseOrderListing();
    const { getPurchaseOrderLinesById } = usePurchaseOrderLine();

    const handleSubmit = (delivery: Delivery) => {
        delivery.purchaseOrderId = selectedPurchaseOrder?.id;
        console.log("Delivery initialized from PO:", delivery);
        initializeDelivery(delivery);
        router.push("/purchase-order-items");
    };

    // Check if selectedPurchaseOrder is null or undefined before proceeding
    if (!selectedPurchaseOrder) {
        return <Text>Error: No purchase order selected</Text>;
    };

    useEffect(() => {
        if (selectedPurchaseOrder) {
            getPurchaseOrderLinesById(selectedPurchaseOrder.id).then((lines) => {
                setInitialPOListing(lines);
            });
        }
    }, [selectedPurchaseOrder]);

    const deliveryDetails = purchaseOrderToDelivery(selectedPurchaseOrder);

    return (
        <>
        <StepIndicator currentStep={1} steps={poSteps} />
        <PurchaseOrderDetails purchaseOrder={selectedPurchaseOrder} />

        <AddDeliveryForm
            suppliers={deliveryDetails.supplier ? [deliveryDetails.supplier] : []}

            onSubmit={handleSubmit}

            existingPartialDelivery={deliveryDetails} 
            currentUser={user || undefined}
        />

        </>
    );

};