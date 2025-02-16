import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText, Searchbar, IconButton, Surface } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { Product } from "@/entities/product";
import { ReceivedItem } from "@/entities/received-item";
import { FlatList } from "react-native";

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
    const [quantities, setQuantities] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartCollapsed, setIsCartCollapsed] = useState(false);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuantityChange = (text: string, productId: number) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantities(prev => ({
            ...prev,
            [productId]: numericValue
        }));
        setErrors(prev => ({
            ...prev,
            [productId]: ''
        }));
    };

    const handleAddItem = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (!product || !quantities[productId]) return;

        const quantity = parseInt(quantities[productId]);
        
        if (quantity < 1) {
            const errorMessage = 'Quantity must be at least 1';
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return;
        }

        const receivedItem: ReceivedItem = {
            product: product,
            quantity: quantity,
            total: product.price * quantity
        };

        onAddToDelivery(receivedItem);
        setQuantities(prev => ({ ...prev, [productId]: "1" }));
    };

    const renderProductItem = ({ item: product }: { item: Product }) => (
        <Surface style={styles.productCard} elevation={1}>
            <View style={styles.productContent}>
                <View style={styles.productInfo}>
                    <Text variant="titleMedium">{product.name}</Text>
                    <Text variant="bodyMedium">₱{product.price}</Text>
                    <View style={styles.productMeta}>
                        <Text variant="bodySmall">Stock: {product.stocks}</Text>
                        <Text variant="bodySmall">Unit: {product.unitType}</Text>
                    </View>
                </View>
                <View style={styles.productActions}>
                    <TextInput
                        mode="outlined"
                        label="Qty"
                        value={quantities[product.id] || ''}
                        onChangeText={(text) => handleQuantityChange(text, product.id)}
                        keyboardType="numeric"
                        style={styles.quantityInput}
                        error={!!errors[product.id]}
                    />
                    <Button
                        mode="contained"
                        onPress={() => handleAddItem(product.id)}
                    >
                        Add
                    </Button>
                </View>
            </View>
            {errors[product.id] && (
                <HelperText type="error" visible={true}>
                    {errors[product.id]}
                </HelperText>
            )}
        </Surface>
    );

    const renderCartItem = ({ item }: { item: ReceivedItem }) => (
        <Surface style={styles.cartItem} elevation={1}>
            <View style={styles.cartItemContent}>
                <View style={styles.cartItemInfo}>
                    <Text variant="titleMedium">{item.product.name}</Text>
                    <Text variant="bodyMedium">
                        {item.quantity} x ₱{item.product.price} = ₱{item.total}
                    </Text>
                </View>
                <IconButton
                    icon="delete"
                    mode="outlined"
                    onPress={() => onRemoveFromDelivery(item.product)}
                />
            </View>
        </Surface>
    );

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <Searchbar
                    placeholder="Search products"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.productList}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                />
            </View>

            <Surface style={[styles.cart, isCartCollapsed && styles.cartCollapsed]}>
                <View style={styles.cartHeader}>
                    <Text variant="titleMedium">Delivery Cart</Text>
                    <IconButton
                        icon={isCartCollapsed ? "chevron-up" : "chevron-down"}
                        onPress={() => setIsCartCollapsed(!isCartCollapsed)}
                    />
                </View>
                
                {!isCartCollapsed && (
                    <>
                        <FlatList
                            data={delivery.items}
                            renderItem={renderCartItem}
                            keyExtractor={(item) => item.product.id.toString()}
                            style={styles.cartList}
                        />
                        <Surface style={styles.cartFooter} elevation={1}>
                            <Text variant="headlineSmall">
                                Total: ₱{delivery.total}
                            </Text>
                            <Button 
                                mode="contained" 
                                onPress={onProceed}
                                style={styles.checkoutButton}
                            >
                                Proceed to Finalize
                            </Button>
                        </Surface>
                    </>
                )}
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mainContent: {
        flex: 1,
        padding: 12, // Slightly reduced padding
    },
    searchBar: {
        marginBottom: 12, // Reduced margin
        elevation: 2,
    },
    productList: {
        gap: 6, // Reduced gap between items
    },
    productCard: {
        padding: 8, // Reduced padding
        borderRadius: 6, // Smaller border radius
        backgroundColor: 'white',
    },
    productContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productInfo: {
        flex: 1,
        gap: 2, // Reduced gap
    },
    productMeta: {
        flexDirection: 'row',
        gap: 6, // Smaller spacing
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    quantityInput: {
        width: 60, // Smaller input
        height: 35, // Reduced height
        fontSize: 12, // Smaller font
    },

    cart: {
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        elevation: 6,
        maxHeight: '45%', // Slightly smaller
    },
    cartCollapsed: {
        maxHeight: 48, // Reduced height when collapsed
    },
    cartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8, // Reduced vertical padding
        paddingHorizontal: 12,
        borderBottomWidth: 0.5, // Smaller border
        borderBottomColor: '#d0d0d0',
    },
    cartList: {
        maxHeight: '100%',
    },
    cartItem: {
        marginHorizontal: 12,
        marginVertical: 2, // Smaller margin
        padding: 8, // Reduced padding
        borderRadius: 6, // Smaller radius
    },
    cartItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartItemInfo: {
        flex: 1,
    },
    cartFooter: {
        padding: 12, // Reduced padding
        borderTopWidth: 0.5, // Thinner border
        borderTopColor: '#d0d0d0',
        gap: 6, // Smaller spacing
    },
    checkoutButton: {
        marginTop: 6,
    },
});
