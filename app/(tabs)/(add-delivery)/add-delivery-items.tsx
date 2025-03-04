import { DeliveryCartComponent } from "@/components/delivery-cart/delivery-cart";
import { useDeliveryCart } from "@/context/delivery-cart-context";
import { View, StyleSheet, Alert, Modal, ActivityIndicator } from "react-native";

import StepIndicator from "@/components/order-step-indicator";
import deliverySteps from "./delivery-steps-label";
import { useDelivery } from "@/context/delivery-context";

import { router } from "expo-router";

import { useProducts } from "@/context/product-context";
import { useState } from "react";

export default function AddDeliveryItemsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const { products } = useProducts();
    const { updateReceivedDelivery, finalizeDelivery } = useDelivery();
    const{ delivery, addToDelivery, removeFromDelivery, getDelivery} = useDeliveryCart();

    const handleProceed = async () => {
        setIsLoading(true);
        try {
            updateReceivedDelivery(getDelivery());
            const deliveryResult = await finalizeDelivery(getDelivery());
            
            setIsLoading(false);

            if (deliveryResult?.success) {
                Alert.alert(
                    "Success",
                    deliveryResult.message,
                    [
                        { 
                            text: "OK", 
                            onPress: () => router.push("/") 
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

            <DeliveryCartComponent
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
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
            </Modal>

        </View>
    )
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