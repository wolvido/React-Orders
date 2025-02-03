import { DeliveryCartComponent } from "@/components/delivery-cart";
import { useDelivery } from "@/context/delivery-cart-context";
import { View, StyleSheet } from "react-native";
import { products } from "@/dummy-data/dummy-products";
import StepIndicator from "@/components/order-step-indicator";
import deliverySteps from "./delivery-steps-label";

export default function AddDeliveryItemsScreen() {

    const{ delivery, addToDelivery, removeFromDelivery} = useDelivery();

        const handleProceed = () => {
            console.log(delivery);
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