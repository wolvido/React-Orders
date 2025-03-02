import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText, Searchbar, IconButton, Surface } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { Product } from "@/entities/product";
import { ReceivedItem } from "@/entities/received-item";
import { FlatList } from "react-native";
import useOrientation from "@/hooks/orientation-hook";
import DeliveryProductForm from "./delivery-product-form";
import styles from "./delivery-styles";
import { DeliveryCartPanel } from "./delivery-cart-panel";

interface DeliveryCartComponentProps {
    products: Product[];
    delivery: ReceivedDelivery;
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onRemoveFromDelivery: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export function DeliveryCartComponent({
    products,
    delivery,
    onAddToDelivery,
    onRemoveFromDelivery,
    onProceed,
    onError
}: DeliveryCartComponentProps) {
    const isPortrait = useOrientation() === 'PORTRAIT';
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');
    

    // filter out isBundle products
    products = products.filter(product => !product.isBundle);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddItem = (productId: number, quantity: number, price?: number) => {
        const product = products.find(p => p.id === productId);

        // Check if product exists or quantity is valid
        if (!product || !quantity) return;
        
        if (quantity < 1) {
            const errorMessage = 'Quantity must be at least 1';
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return
        }

        //const quantity = parseInt(quantities[productId]);
        const customPrice = price ? price : product.costPrice;
        console.log(customPrice);
    
        const receivedItem: ReceivedItem = {
            product: product,
            quantity: quantity,
            manualPrice: customPrice,
            total: customPrice * quantity  // Use custom price here
        };
        onAddToDelivery(receivedItem);
    };

    const deliveryProductForm = (productId: number) => {
        return (
            <DeliveryProductForm
                productId={productId}
                onAdd={handleAddItem}
                error={errors[productId]}
                isPortrait={isPortrait}
            />
        );
    }

    const renderProductItem = useCallback(({ item: product }: { item: Product }) => (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>
                    {!isPortrait && deliveryProductForm(product.id)}

                    <View style={styles.productInfo}>
                        <Text
                            variant={"bodyMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={2}
                        >
                            BasePrice : ₱{product.costPrice} • {product.name}
                        </Text>
                    </View>
    
                    <View style={styles.stockInfo}>
                        <Text variant="bodySmall">
                            Stock: {product.stocks}
                        </Text>
                    </View>

                    {isPortrait && deliveryProductForm(product.id)}

                </View>
                
                {errors[product.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[product.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    ), [isPortrait, errors]);

    const SummarySection = () => (
        <View style={styles.summaryContainer}>
            <Text variant="titleLarge" style={styles.total}>
                Total: ₱{delivery.total}
            </Text>
            <Text variant="titleLarge" style={styles.total}>
                Quantity: {delivery.items.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
            </Text>
            <Button mode="contained" onPress={onProceed}>
                Proceed
            </Button>
        </View>
    );

    return (
        <View style={[styles.content, styles.contentPortrait]}>

            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>

                {/* <ProductList /> */}
                <View style={[styles.mainContentPortrait]}>
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
                        initialNumToRender={15}
                        maxToRenderPerBatch={15}
                        windowSize={3}
                        removeClippedSubviews={true}
                        keyboardShouldPersistTaps="always"
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyText}>
                                {searchQuery ? "No products found" : "No products available"}
                            </Text>
                        )}
                    />
                </View>

                <DeliveryCartPanel
                    items={delivery.items}
                    isPortrait={isPortrait}
                    onRemoveFromDelivery={onRemoveFromDelivery}
                    collapsible={true}
                />
            </View>

            <SummarySection />
        </View>
    );
}

