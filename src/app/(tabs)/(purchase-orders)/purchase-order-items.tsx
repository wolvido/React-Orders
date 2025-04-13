import StepIndicator from "@/src/features/step-indicator-feature/components/order-step-indicator";
import { useState } from "react";
import { View, StyleSheet, Alert, Modal, ActivityIndicator, Text } from "react-native";
import poSteps from "./po-steps-label";
import { PurchaseOrderCart } from "@/src/features/purchase-order-feature/components/cart/purchase-order-cart";
import { usePurchaseOrderListing } from "@/src/features/purchase-order-feature/context/purchase-order-listing-context";
import { useDeliveryCart } from "@/src/features/delivery-feature/context/delivery-cart-context";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { buildDeliveryLines } from "@/src/features/purchase-order-feature/util/build-deliverylines";
import { Product } from "@/src/entities/product/type/product";
import { useDelivery } from "@/src/features/delivery-feature/context/delivery-context";
import { useProducts } from "@/src/entities/product/context-service/product-context";
import { router } from "expo-router";
import { usePurchaseOrder } from "@/src/features/purchase-order-feature/context/purchase-order-context";

export default function PurchaseOrderItemsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const { reloadPurchaseOrders } = usePurchaseOrder();
    const { purchaseOrderListing, addToCart, restorePOLineByProduct, clearPurchaseOrderListing } = usePurchaseOrderListing();
    const { removeFromDelivery, delivery, addToDelivery, getDelivery, clearDelivery } = useDeliveryCart();
    const { updateReceivedDelivery, finalizeDelivery } = useDelivery();
    const { finalizePurchaseOrderUpdate } = usePurchaseOrder();
    const { refreshProducts } = useProducts();

    const onAddToCart = (poLine: PurchaseOrderLine) => {
        setIsLoading(true);
        addToCart(poLine);
        const deliveryLine = buildDeliveryLines(poLine);
        addToDelivery(deliveryLine);
        setIsLoading(false);
    };

    const onRemoveFromCart = (product: Product) => {
        setIsLoading(true);
        restorePOLineByProduct(product);
        removeFromDelivery(product);
        setIsLoading(false);
    };

    const handleProceed = async () => {
        setIsLoading(true);

        try {
            updateReceivedDelivery(getDelivery());
            const purchaseOrderUpdateResult = await finalizePurchaseOrderUpdate(purchaseOrderListing);
            console.log("Purchase Order Update Result:", purchaseOrderUpdateResult?.success, purchaseOrderUpdateResult?.message);
            const deliveryResult = await finalizeDelivery(getDelivery());

            if (deliveryResult?.success && purchaseOrderUpdateResult?.success) {
                Alert.alert(
                    "Success",
                    deliveryResult?.message + "\n" + purchaseOrderUpdateResult?.message,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                router.push("/(tabs)/(purchase-orders)/purchase-orders");
                                router.push("/(tabs)/(products)/products");
                            }
                        }
                    ]
                );
            } else {
                Alert.alert(
                    "Error",
                    deliveryResult?.message + "\n" + purchaseOrderUpdateResult?.message,
                    [{ text: "OK" }]
                );
            }
            
            clearDelivery(); 
            clearPurchaseOrderListing();

            setIsLoading(false);

            try {
                setIsLoading(true);
                await reloadPurchaseOrders();
                await refreshProducts();
                setIsLoading(false);
            } catch (refreshError) {
                console.error('Failed to refresh products:', refreshError);
                // show warning to the user that the product list may be outdated
            }


        } catch (error) {
            setIsLoading(false);
            Alert.alert(
                "Error",
                "An unexpected error occurred",
                [{ text: "OK" }]
            );
        }
    }

    return (
        <View style={styles.container}>
            <StepIndicator currentStep={2} steps={poSteps} backPath="./receive-purchase-order"/>

            <PurchaseOrderCart
                purchaseOrderLines={purchaseOrderListing}
                delivery={delivery}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onProceed={handleProceed}
                
                // onError={(message) => {
                //     console.error(message);
                // }}
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