import { View } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import useOrientation from "@/hooks/orientation-hook";
import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";
import { CartItem } from "@/entities/cart-item";
import { SummaryPanel } from "../summary-panel";
import styles from "./cart-styles";
import { CartPanel } from "./cart-panel";
import { ProductList } from "./product-list";

interface CartComponentProps {
    products: Product[];
    cart: Cart;
    onAddToCart: (cartItem: CartItem) => void;
    onBundleProductToCart: (product: Product, quantity: number) => void;
    onRemoveFromCart: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
    isLoading?: boolean;
}

export function CartComponent({
    products,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onBundleProductToCart,
    onProceed,
    onError,
    isLoading
}: CartComponentProps) {

    const isPortrait = useOrientation() === 'PORTRAIT';

    if (isLoading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <View style={[styles.content, styles.contentPortrait]}>
            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                <ProductList
                    products={products}
                    onAddToCart={onBundleProductToCart}
                    onError={onError}
                    isPortrait={isPortrait}
                />
                <CartPanel
                    items={cart.items}
                    isPortrait = {isPortrait}
                    onRemoveFromCart={(cartItem) => onRemoveFromCart(cartItem.product)}
                    collapsible = {true}
                />
            </View>
            <SummaryPanel
                total={cart.total}
                quantity={cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                onProceed={onProceed}
            />
        </View>
    );
}
