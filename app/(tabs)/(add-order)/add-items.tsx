// add-items.tsx
import { View, StyleSheet } from "react-native";
import StepIndicator from "@/components/order-step-indicator";
import { router } from "expo-router";
import { useCart } from "@/context/cart-context";
import { CartComponent } from "@/components/order-cart/cart";
import orderSteps from "./order-steps-label";
import { useOrder } from "@/context/order-context";
import { useProducts } from "@/context/product-context";

export default function AddItemsScreen() {

    const { products, isLoading, updateProducts } = useProducts();
    const { cart, addToCart, removeFromCart, BundleProductToCart } = useCart();
    const { updateCart } = useOrder();

    const handleProceed = () => {
        updateCart(cart);
        router.push('/finalize-order');
    };

    return (
        <View style={styles.container}>
            <StepIndicator 
                currentStep={2} 
                backPath="./add-order" 
                steps={orderSteps} 
            />
            
            <CartComponent
                products={products}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onBundleProductToCart={BundleProductToCart}
                onProceed={handleProceed}
                isLoading={isLoading}
                onUpdateProducts={updateProducts}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
