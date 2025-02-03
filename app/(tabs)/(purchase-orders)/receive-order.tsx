import StepIndicator from "@/components/order-step-indicator";
import receivePOSteps from "./receive-PO-steps";
import { View } from "react-native";
import deliverySteps from "../(add-delivery)/delivery-steps-label";
import PurchaseOrderForm from "@/components/purchase-order-form";
import { purchaseOrders } from "@/dummy-data/dummy-purchase-orders";
import { PurchaseOrder } from "@/entities/purchase-order";
import AddDeliveryForm from "@/components/add-delivery-form";
import { dummySuppliers } from "@/dummy-data/dummy-suppliers";
import { Delivery } from "@/entities/delivery";
import { router } from "expo-router";

export default function ReceiveOrderScreen() {
    const handleSubmitPO = (PurchaseOrder: Partial<PurchaseOrder>) => {
        // Handle the form submission here
        console.log(PurchaseOrder);
    };

    const handleSubmitDelivery = (delivery: Delivery) => {
        console.log(delivery);
        router.push('./purchase-order-items');
    };

    return (
        <View>
            <StepIndicator currentStep={1} backPath="./purchase-orders" steps={receivePOSteps}/>
            <PurchaseOrderForm initialData={purchaseOrders[0]} onSubmit={handleSubmitPO}/>
            <AddDeliveryForm suppliers={dummySuppliers} existingDelivery={purchaseOrders[0].delivery} onSubmit={handleSubmitDelivery}/>
        </View>
    );

}