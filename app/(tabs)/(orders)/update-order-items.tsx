// add-items.tsx
import { View, StyleSheet } from "react-native";
import StepIndicator from "@/components/order-step-indicator";
import { router } from "expo-router";
import { useCart } from "@/context/cart-context";
import { CartComponent } from "@/components/order-cart/cart";
import { useOrder } from "@/context/order-context";
import { useProducts } from "@/context/product-context";
import updateOrderSteps from "./update-order-labels";
export default function UpdateOrderItemsScreen() {

    const { products, isLoading } = useProducts();
    const { cart, addToCart, removeFromCart, emptyCart, BundleProductToCart } = useCart();
    const { updateCart } = useOrder();

    const handleProceed = () => {
        updateCart(cart);
        emptyCart();
    };

    return (
        <View style={styles.container}>
            <StepIndicator 
                currentStep={2}
                backPath="./add-order" 
                steps={updateOrderSteps}
            />
            
            <CartComponent
                products={products}
                cart={cart}
                onBundleProductToCart={BundleProductToCart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onProceed={handleProceed}
                isLoading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
