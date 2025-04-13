import { DeliveryCart } from "@/src/features/delivery-feature/components/delivery-cart/delivery-cart";
import { useDeliveryCart } from "@/src/features/delivery-feature/context/delivery-cart-context";
import { View, StyleSheet, Alert, Modal, ActivityIndicator, Text } from "react-native";
import StepIndicator from "@/src/features/step-indicator-feature/components/order-step-indicator";
import deliverySteps from "./delivery-steps-label";
import { useDelivery } from "@/src/features/delivery-feature/context/delivery-context";
import { router } from "expo-router";
import { useProducts } from "@/src/entities/product/context-service/product-context";
import { useState } from "react";

export default function AddDeliveryItemsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const { products, refreshProducts } = useProducts();
    const { updateReceivedDelivery, finalizeDelivery } = useDelivery();
    const { delivery, addToDelivery, removeFromDelivery, getDelivery, clearDelivery} = useDeliveryCart();

    const handleProceed = async () => {
        setIsLoading(true);
        try {
            updateReceivedDelivery(getDelivery());
            const deliveryResult = await finalizeDelivery(getDelivery());
            clearDelivery(); // Clear the delivery cart after finalizing

            try {
                await refreshProducts();
            } catch (refreshError) {
                console.error('Failed to refresh products:', refreshError);
                // show warning to the user that the product list may be outdated
            }
            
            setIsLoading(false);

            if (deliveryResult?.success) {
                Alert.alert(
                    "Success",
                    deliveryResult.message,
                    [
                        { 
                            text: "OK", 
                            onPress: () => {
                                router.push("/(tabs)/(add-delivery)/add-delivery");
                                router.push("/(tabs)/(products)/products");
                            }
                        }
                    ]
                );
            } else {
                Alert.alert(
                    "Error",
                    deliveryResult?.message,
                    [{ text: "OK" }]
                );
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert(
                "Error",
                "An unexpected error occurred",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <StepIndicator currentStep={2} backPath="./add-delivery" steps={deliverySteps} />

            <DeliveryCart
                products={products}
                delivery={delivery}
                onAddToDelivery={addToDelivery}
                onRemoveFromDelivery={removeFromDelivery}
                onProceed={handleProceed}
            />

            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}
                onRequestClose={() => {}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Updating Products...</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});