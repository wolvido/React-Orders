import { DeliveryCartComponent } from "@/components/delivery-cart";
import { useDeliveryCart } from "@/context/delivery-cart-context";
import { View, StyleSheet } from "react-native";
import { products } from "@/dummy-data/dummy-products";
import StepIndicator from "@/components/order-step-indicator";
import deliverySteps from "./delivery-steps-label";
import { useDelivery } from "@/context/delivery-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function AddDeliveryItemsScreen() {

    const { updateReceivedDelivery, finalizeDelivery } = useDelivery();

    const{ delivery, addToDelivery, removeFromDelivery, getDelivery, clearDelivery} = useDeliveryCart();

        const handleProceed = () => {
            updateReceivedDelivery(getDelivery());
            finalizeDelivery();
            clearDelivery();

            router.push("/");
        };

    return (
        <View style={styles.container}>
            <StepIndicator currentStep={2} backPath="./add-delivery" steps={deliverySteps} />

            <DeliveryCartComponent
                products={products}
                delivery={delivery}
                onAddToDelivery={addToDelivery}
                onRemoveFromDelivery={removeFromDelivery}
                onProceed={handleProceed}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});