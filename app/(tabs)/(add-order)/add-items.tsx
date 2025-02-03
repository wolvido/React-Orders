// add-items.tsx
import { View, StyleSheet } from "react-native";
import StepIndicator from "@/components/order-step-indicator";
import { router } from "expo-router";
import { useCart } from "@/context/cart-context";
import { products } from "@/dummy-data/dummy-products";
import { CartComponent } from "@/components/cart";
import orderSteps from "./order-steps-label";
import { useOrder } from "@/context/order-context";

export default function AddItemsScreen() {
    const { cart, addToCart, removeFromCart } = useCart();
    const { getCurrentOrder, updateCart } = useOrder();

    const handleProceed = () => {
        updateCart(cart);
        router.push('/finalize-order');
    };

    return (
        <View style={styles.container}>

            <StepIndicator currentStep={2} backPath="./add-order" steps={orderSteps} />

            <CartComponent
                products={products}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onProceed={handleProceed}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
