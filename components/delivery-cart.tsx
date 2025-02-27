import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText, Searchbar, IconButton, Surface } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { Product } from "@/entities/product";
import { ReceivedItem } from "@/entities/received-item";
import { FlatList } from "react-native";
import useOrientation from "@/hooks/orientation-hook";
import DeliveryProductForm from "./delivery-product-form";

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
    const [isCartCollapsed, setIsCartCollapsed] = useState(false);

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

    const renderCartItem = useCallback(({ item }: { item: ReceivedItem }) => (
        <View style={styles.cartItemWrapper}>
            <View style={styles.cartItemContent}>
                <View style={styles.cartItemInfo}>
                    <View style={styles.cartItemRow}>
                        <Text style={styles.cartItemName} numberOfLines={1}>
                            {item.product.name}
                        </Text>
                        <Text style={styles.cartItemPrice}>
                            ₱{item.total}
                        </Text>
                        <Text style={styles.cartItemQuantity}>
                            | Quantity: {item.quantity}
                        </Text>
                    </View>
                </View>
                <IconButton
                    icon="delete-outline"
                    size={20}
                    onPress={() => onRemoveFromDelivery(item.product)}
                    style={styles.removeButton}
                />
            </View>
        </View>
    ), [onRemoveFromDelivery]);

    const CartSection = () => (
        <View style={[
            styles.rightPanel, 
            isPortrait && styles.rightPanelPortrait,
            isCartCollapsed && styles.rightPanelCollapsed
        ]}>
            <View style={[isPortrait && styles.collapseButtonContainer, !isPortrait && styles.landscapeCollapseButtonContainer]}>
                {isPortrait && (
                    <IconButton
                    icon={isCartCollapsed ? "chevron-up" : "chevron-down"}
                    onPress={() => setIsCartCollapsed(!isCartCollapsed)}
                    size={20}
                    mode="contained"
                    />
                )}

                {!isPortrait && (
                    <IconButton
                    icon={isCartCollapsed ? "chevron-left" : "chevron-right"}
                    onPress={() => setIsCartCollapsed(!isCartCollapsed)}
                    size={20}
                    mode="contained"
                    />
                )}
            </View>
                
            {!isCartCollapsed && (
                <View style={styles.cartContent}>
                    <Text variant="headlineMedium">Cart</Text>
                    <FlatList
                        data={delivery.items}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.product.id.toString()}
                        style={styles.cartList}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        contentContainerStyle={styles.cartListContent}
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyText}>Cart is empty</Text>
                        )}
                    />
                </View>
            )}
        </View>
    );

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

                <CartSection/>
            </View>

            <SummarySection />
        </View>
    );
}

const styles = StyleSheet.create({
    landscapeContentPortrait:{
        gap: 10,
    },
    landscapeCollapseButtonContainer:{
        position: 'absolute',
        top: 0,
        right: 650,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    mainContent:{
        flex: 1,
        padding: 10,
    },
    mainContentPortrait:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    rightPanel: {
        flex: 1,
        backgroundColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        position: 'relative',
    },
    cartContent: {
        flex: 1,
        padding: 10,
        paddingTop: 15, // Give space for the collapse button
    },
    cartList: {
        flex: 1, // This ensures the list is scrollable
    },
    cartListContent: {
        padding: 4,
    },
    cartItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        width: '100%',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cartItemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#666',
    },
    cartItemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    removeButton: {
        margin: 0,
    },
    cartItemDetails: {
        fontSize: 12,
        color: '#666',
    },
    collapseButtonContainer: {
        position: 'absolute',
        top: -30,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    collapseButton: {
        position: 'absolute',
        top: -20, // Move it slightly above the panel
        left: -20, // Pull it slightly to the left
        zIndex: 1,
        backgroundColor: 'white', // Add background to make it stand out
        // Add shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flex: 1,
        flexDirection: 'row', // side by side in landscape
    },
    contentPortrait: {
        flexDirection: 'column', // stacked in portrait
    },
    leftPanel: {
        flex: 1,
        padding: 10,
    },
    rightPanelPortrait: {
        flex: 1, // cart height in portrait
    },
    rightPanelCollapsed: {
        flex: 0.01, // When collapsed, take minimal space
    },
    productsList: {
        height: 10,
    },
    rightPanelPortraitFocused: {
        height: '20%', // Adjust this value as needed
    },
    cartRow: {
        justifyContent: 'flex-start',
        gap: 8,
    },
    cartItemText: {
        fontSize: 12,
        flex: 1,
    },
    summaryContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    emptyText: {
        textAlign: 'center',
        padding: 16,
        color: '#666',
    },
    cartItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        padding: 4,
    },
    cardContent: {
        paddingVertical: 4, // minimal padding
        paddingHorizontal: 8,
        //paddingRight: 130
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    productCard: {
        marginBottom: 8,
        //paddingRight: 140
    },
    productCardPortrait: {
        marginBottom: 4,
        paddingVertical: 0, // reduced padding
        paddingRight: 0
    },
    productInfo: {
        flex: 2,
        justifyContent: 'center',
    },
    productName: {
        marginBottom: 2,
    },
    priceText: {
        color: '#666',
    },
    stockInfo: {
        flex: 1,
        alignItems: 'center',
    },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    actionSectionPortrait: {
        gap: 4,
        justifyContent: 'flex-end',
    },
    quantityInput: {
        width: 80,
    },
    quantityInputPortrait: {
        width: 50,
        height: 35, // reduced height
        fontSize: 12,
    },
    compactText: {
        fontSize: 13,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    pill: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    addItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    quantityContainer: {
        flex: 1,
        marginRight: 10,
    },
    total: {
        textAlign: 'right',
        fontSize: 20
    },
    errorText: {
        color: '#B00020', 
        fontSize: 12,
        marginTop: 4,
    },
    proceedButton: {
        paddingVertical: 6,
    },
    searchBar: {
        marginTop: 10,
        elevation: 0, // Removes shadow on Android
        borderRadius: 8,
    },
    leftPanelPortrait: {
        flex: 2,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemTitlePortrait: {
        fontSize: 14,
    },
    cartItemDescPortrait: {
        fontSize: 12,
    },
    proceedButtonPortrait: {
        marginTop: 8,
    },
    loadingText: {
        textAlign: 'center',
        padding: 16,
        height: '85%',
    }
    
});