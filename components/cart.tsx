import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { Button, Card, TextInput, Text, HelperText, Searchbar, IconButton, ActivityIndicator } from "react-native-paper";
import { useState, useCallback, useEffect } from "react";
import useOrientation from "@/hooks/orientation-hook";
import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";
import { CartItem } from "@/entities/cart-item";
import { FlatList } from "react-native";

interface CartComponentProps {
    products: Product[];
    cart: Cart;
    onAddToCart: (cartItem: CartItem) => void;
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
    onProceed,
    onError,
    isLoading
}: CartComponentProps) {
    const [quantities, setQuantities] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const isPortrait = useOrientation() === 'PORTRAIT';

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuantityChange = (text: string, productKey: number) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantities(prev => ({
            ...prev,
            [productKey]: numericValue
        }));
        setErrors(prev => ({
            ...prev,
            [productKey]: ''
        }));
    };

    const handleQuantityFocus = useCallback((productKey: number) => {
        requestAnimationFrame(() => {
            setQuantities(prev => ({ ...prev, [productKey]: '' }));
            setErrors(prev => ({ ...prev, [productKey]: '' }));
        });
    }, []);

    const handleQuantityBlur = useCallback((productKey: number) => {
        setQuantities(prev => ({
            ...prev,
            [productKey]: prev[productKey] || '1'
        }));
    }, []);

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
    
        const cartItem: CartItem = {
            product: product,
            quantity: quantity,
            total: product.price * quantity
        };
    
        // Batch the state updates together
        requestAnimationFrame(() => {
            onAddToCart(cartItem);
            setErrors(prev => ({ ...prev, [productId]: '' }));
        });
    };

    const [isQuantityInputFocused, setIsQuantityInputFocused] = useState(false);

    const renderProductItem = useCallback(({ item: product }: { item: Product }) => (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>
                    <View style={styles.productInfo}>
                        <Text
                            variant={isPortrait ? "bodyMedium" : "titleMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={1}
                        >
                            {product.name} • ₱{product.price}
                        </Text>
                    </View>

                    <View style={styles.stockInfo}>
                        <Text variant="bodySmall">
                            Stock: {product.stocks}
                        </Text>
                    </View>

                    <View style={[styles.actionSection, isPortrait && styles.actionSectionPortrait]}>
                        <TextInput
                            mode="outlined"
                            label="Qty"
                            value={quantities[product.id] || ''}
                            onChangeText={(text) => handleQuantityChange(text, product.id)}
                            onFocus={() => {handleQuantityFocus(product.id); setIsQuantityInputFocused(true);}}
                            onBlur={() => {handleQuantityBlur(product.id); setIsQuantityInputFocused(false);}}
                            
                            keyboardType="numeric"
                            style={[styles.quantityInput, isPortrait && styles.quantityInputPortrait]}
                            maxLength={5}
                            error={!!errors[product.id]}
                        />
                        {isPortrait ? (
                            <IconButton
                                icon="chevron-right"
                                mode="contained"
                                size={20}
                                onPress={() => handleAddItem(product.id)}
                            />
                        ) : (
                            <Button
                                mode="contained"
                                onPress={() => handleAddItem(product.id)}
                            >
                                Add
                            </Button>
                        )}
                    </View>
                </View>
                {errors[product.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[product.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    ), [isPortrait, quantities, errors]);

    const renderCartItem = useCallback(({ item }: { item: CartItem }) => (
        <View style={styles.cartItemWrapper}>
            <Text style={styles.cartItemText} numberOfLines={1}>
                {item.product.name} ({item.quantity}) • ₱{item.total}
            </Text>
            <IconButton
                icon="close-circle"
                size={16}
                onPress={() => onRemoveFromCart(item.product)}
                style={styles.removeButton}
            />
        </View>
    ), [onRemoveFromCart]);

    if (isLoading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (

        <View style={[styles.content, isPortrait && styles.contentPortrait]}>

            <KeyboardAvoidingView style={[styles.leftPanel, isPortrait && styles.leftPanelPortrait]}>
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
                    maxToRenderPerBatch={40}
                    windowSize={3}
                    removeClippedSubviews={true}
                    keyboardShouldPersistTaps="handled"
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>
                            {searchQuery ? "No products found" : "No products available"}
                        </Text>
                    )}
                />
            </KeyboardAvoidingView>

            <View style={[
                styles.rightPanel, 
                isPortrait && styles.rightPanelPortrait,
            ]}>
                <Text variant="headlineMedium">Cart</Text>
                <FlatList
                    data={cart.items}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.product.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.cartRow}
                    style={styles.cartList}
                    contentContainerStyle={styles.cartListContent}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>Cart is empty</Text>
                    )}
                />
            </View>
            

            <View style={styles.summaryContainer}>
                <Text variant="titleLarge" style={styles.total}>
                    Total: ₱{cart.total}
                </Text>
                <Text variant="titleLarge" style={styles.total}>
                    Quantity: {cart.items.length}
                </Text>
                <Button mode="contained" onPress={onProceed}>
                    Proceed
                </Button>
            </View>

           
        </View>
    );
}

const styles = StyleSheet.create({
    productsList: {
        height: 10,
    },
    rightPanel: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%', // or whatever width you need
        height: '100%',
        padding: 10,
        backgroundColor: 'white', // ensure background is solid
    },
    rightPanelPortrait: {
        width: '100%',
        height: '40%',
        bottom: 0,
        top: 'auto',
    },
    rightPanelPortraitFocused: {
        height: '20%', // Adjust this value as needed
    },
    cartList: {
        flex: 1,
    },
    cartListContent: {
        padding: 4,
    },
    cartRow: {
        justifyContent: 'flex-start',
        gap: 8,
    },
    cartItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(183, 163, 163, 0.47)',
        borderRadius: 16,
        paddingLeft: 8,
        paddingRight: 4,
        flex: 0.48, // slightly less than half to account for gap
        marginBottom: 8,
    },
    cartItemText: {
        fontSize: 12,
        flex: 1,
    },
    removeButton: {
        margin: 0,
        padding: 0,
    },
    summaryContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
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
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    productCard: {
        marginBottom: 8,
    },
    productCardPortrait: {
        marginBottom: 4,
        paddingVertical: 0, // reduced padding
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
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    leftPanel: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
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
    contentPortrait: {
        flexDirection: 'column',
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
