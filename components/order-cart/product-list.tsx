import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, HelperText, Searchbar, IconButton, ActivityIndicator } from "react-native-paper";
import { useState, useCallback } from "react";
import { Product } from "@/entities/product";
import ProductQuantityForm from "@/components/order-cart/product-quantity-form";
import styles from "./cart-styles";
import theme from "@/style/theme";

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => {success: boolean, error?: string};
    onError?: (message: string) => void;
    onUpdateProducts: () => Promise<void>;
    isLoading?: boolean;
    isPortrait: boolean;
}

export function ProductList({
    products,
    onAddToCart,
    onError,
    isPortrait,
    onUpdateProducts,
    isLoading
}: ProductListProps) {
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddItem = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) return { success: false, error: 'Product not found' };
        
        const result = onAddToCart(product, quantity);

        if (!result.success) {
            const errorMessage = 'Failed to add item to cart';
            setErrors(prev => ({
                ...prev,
                [productId]: result.error || errorMessage
            }));
            onError?.(errorMessage);
        }
        else{
            //clear errors on success
            setErrors(prev => ({ ...prev, [productId]: '' }));
        }

        //why does product list handle the passing of product and setting errors?
            //because product list has access to the products
            //and the errors, when a product is passed

        return result;
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
                            {product.isBundle ? (
                                // <Text style={{ color: 'rgb(192, 163, 2)' }}>
                                //     Bundle
                                // </Text>
                                `Bundle: ${product.bundleQuantity} pieces`
                            ) : (
                                `Stock: ${product.stocks}`
                            )}
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

    const onRefresh = async () => {
        console.log('Refreshing products...');
        await onUpdateProducts();
    };

    const refreshButton = (
        <IconButton
            icon="refresh"
            size={24}
            onPress={onRefresh}
            style={styles.refreshButton}
            mode = "contained"
        />
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.loadingCard}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                    <Text style={styles.loadingText}>Updating Items...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mainContentPortrait}>
            <View style={styles.searchContainer}>
                {!isPortrait && refreshButton}

                <Searchbar
                    placeholder="Search products"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                
                {isPortrait && refreshButton}
            </View>
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