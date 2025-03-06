// add-items.tsx
import { View, StyleSheet, Text } from "react-native";
import StepIndicator from "@/components/order-step-indicator";
import { router } from "expo-router";
import { useCart } from "@/context/cart-context";
import { CartComponent } from "@/components/order-cart/cart";
import { useOrder } from "@/context/order-context";
import { useProducts } from "@/context/product-context";
import updateOrderSteps from "./update-order-labels";
import { OrderLineRepository } from "@/repositories/order-line-repository";
import { useEffect, useState } from "react";
import { Cart } from "@/entities/cart";
import { ActivityIndicator } from "react-native-paper";

export default function UpdateOrderItemsScreen() {
    const { products, isLoading, refreshProducts } = useProducts();
    const { addToCart, removeFromCart, BundleProductToCart, cart, setCart, emptyCart } = useCart();
    const { updateCart, getCurrentOrder } = useOrder();

    const orderLineRepository = new OrderLineRepository();

    useEffect(() => {
        emptyCart();

        const currentOrder = getCurrentOrder();
        if (currentOrder) {
            orderLineRepository.getCart(currentOrder.id).then((cart) => {
                setCart(cart);
            });
        }
        
        console.log(cart);
    }, []);

    const handleProceed = () => {
        if (cart) {
            updateCart(cart);
        }
        router.push('/finalize-update-order');
    };

    return (
        <View style={styles.container}>
            <StepIndicator
                currentStep={2}
                backPath="./update-order"
                steps={updateOrderSteps}
            />
            
            {(!cart) ? (
                <View>
                    <Text>Loading Cart</Text>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <CartComponent
                    products={products}
                    cart={cart}
                    onBundleProductToCart={BundleProductToCart}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    onProceed={handleProceed}
                    isLoading={isLoading}
                    onUpdateProducts={refreshProducts}
                />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
