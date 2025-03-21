import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, HelperText, Searchbar, IconButton, ActivityIndicator } from "react-native-paper";
import { useState, useCallback, useEffect } from "react";
import { Product } from "@/entities/product";
import ProductQuantityForm from "@/features/order-feature/components/order-forms/product-quantity-form";
import styles from "./cart-styles";
import theme from "@/shared/style/theme";

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
    isLoading,
}: ProductListProps) {

    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleError = (productId: number, error: string) => {
        setErrors(prev => ({
            ...prev,
            [productId]: error
        }));
    };

    useEffect(() => {
        console.log('Product list updated');
        console.log('Products list sample:', products[0]);
    }, [products]);

    const productQuantityForm = (product: Product) => {
        return (
            <ProductQuantityForm
                product={product}
                onAdd={onAddToCart}
                onError={(error) => handleError(product.id, error)}
                isPortrait={isPortrait}
            />
        );
    };

    const renderProductItem = useCallback(({ item: product }: { item: Product }) => (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>
                    {!isPortrait && productQuantityForm(product)}
                    <View style={styles.productInfo}>
                        <Text
                            variant={"bodyMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={2}
                        >
                            ₱{product.price.toFixed(2)} • {product.name}
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
                    {isPortrait && productQuantityForm(product)}
                </View>
                {errors[product.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[product.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    ), [isPortrait, errors, productQuantityForm]);

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