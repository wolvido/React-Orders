import { Product } from "@/entities/product";
import { View, StyleSheet, FlatList } from "react-native";
import { ReceivedItem } from "@/entities/received-item";
import { useCallback, useState } from "react";
import { Card, Text, HelperText, Searchbar } from "react-native-paper";
import DeliveryProductForm from "./delivery-product-form";
import styles from "./delivery-styles";

interface DeliveryProductListProps {
    products: Product[];
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export function DeliveryProductList({
    products,
    onAddToDelivery,
    onError,
    isPortrait
}: DeliveryProductListProps) {
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    products = products.filter(product => !product.isBundle);

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
    ), [isPortrait, errors, deliveryProductForm]);

    return (
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
    );
}