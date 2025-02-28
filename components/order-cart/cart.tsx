import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { Button, Card, TextInput, Text, HelperText, Searchbar, IconButton, ActivityIndicator } from "react-native-paper";
import { useState, useCallback, useEffect } from "react";
import useOrientation from "@/hooks/orientation-hook";
import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";
import { CartItem } from "@/entities/cart-item";
import { FlatList } from "react-native";
import ProductQuantityForm from "@/components/order-cart/product-quantity-form";
import { SummaryPanel } from "./summary-panel";
import styles from "./cart-styles";
import { CartPanel } from "./cart-panel";

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

    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const isPortrait = useOrientation() === 'PORTRAIT';
    const [isCartCollapsed, setIsCartCollapsed] = useState(false);
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddItem = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        //validation
        if (quantity < 1) {
            const errorMessage = 'Quantity must be at least 1';
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return;
        }

        onBundleProductToCart(product, quantity);

        // Clear errors
        requestAnimationFrame(() => {
            setErrors(prev => ({ ...prev, [productId]: '' }));
        });
    };

    const productQuantityForm = (productId: number) => {
        return (
            <ProductQuantityForm
                productId={productId}
                onAdd={handleAddItem}
                error={errors[productId]}
                isPortrait={isPortrait}
            />
        );
    };

    const renderProductItem = useCallback(({ item: product }: { item: Product }) => (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>

                    {!isPortrait && productQuantityForm(product.id)}

                    <View style={styles.productInfo}>
                        <Text
                            variant={"bodyMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={2}
                        >
                            ₱{product.price} • {product.name}
                        </Text>
                    </View> 

                    <View style={styles.stockInfo}>
                        <Text variant="bodySmall">
                            Stock: {product.stocks}
                        </Text>
                    </View>

                    {isPortrait && productQuantityForm(product.id)}

                </View>
                {errors[product.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[product.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    ), [isPortrait, errors]);

    if (isLoading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <View style={[styles.content, styles.contentPortrait]}>

            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                    
                {/* <ProductList /> */}
                <View style={[ styles.mainContentPortrait]}>
                    <Searchbar
                        placeholder="Search products"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                    />
                    <FlatList
                        style={[styles.productsList]}
                        data={filteredProducts}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={15}
                        windowSize={5}
                        removeClippedSubviews={false}
                        keyboardShouldPersistTaps="always"
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyText}>
                                {searchQuery ? "No products found" : "No products available"}
                            </Text>
                        )}
                    />
                </View>

                <CartPanel
                    items={cart.items}
                    isPortrait = {isPortrait}
                    isCartCollapsed={isCartCollapsed}
                    onToggleCollapse={() => setIsCartCollapsed(!isCartCollapsed)}
                    onRemoveFromCart={(cartItem) => onRemoveFromCart(cartItem.product)}
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
