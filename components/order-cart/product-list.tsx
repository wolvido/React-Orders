import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, HelperText, Searchbar } from "react-native-paper";
import { useState, useCallback } from "react";
import { Product } from "@/entities/product";
import ProductQuantityForm from "@/components/order-cart/product-quantity-form";
import styles from "./cart-styles";

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export function ProductList({
    products,
    onAddToCart,
    onError,
    isPortrait
}: ProductListProps) {
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddItem = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) return { success: false };

        //validation
        if (quantity < 1) {
            const errorMessage = 'Quantity must be at least 1';
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return { success: false };
        }

        if (product.stocks < quantity) {
            const errorMessage = `Insufficient stock. Only ${product.stocks} available.`;
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return { success: false };
        }

        setErrors(prev => ({ ...prev, [productId]: '' }));
        onAddToCart(product, quantity);

        return {success: true};
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

    return (
        <View style={styles.mainContentPortrait}>
            <Searchbar
                placeholder="Search products"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
            />
            <FlatList
                style={styles.productsList}
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
    );
}