import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText, Searchbar } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";
import { CartItem } from "@/entities/cart-item";

interface CartComponentProps {
    products: Product[];
    cart: Cart;
    onAddToCart: (cartItem: CartItem) => void;
    onRemoveFromCart: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export function CartComponent({
    products, 
    cart, 
    onAddToCart, 
    onRemoveFromCart,
    onProceed,
    onError 
}: CartComponentProps) {
    const [quantities, setQuantities] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    // Add filtered products logic
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const initialQuantities = products.reduce((acc, product) => ({
            ...acc,
            [product.key]: "1"
        }), {});
        setQuantities(initialQuantities);
    }, [products]);

    const handleQuantityChange = (text: string, productKey: number) => {
        // Only allow numbers
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantities(prev => ({ 
            ...prev, 
            [productKey]: numericValue 
        }));
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [productKey]: ''
        }));
    };

    const handleQuantityFocus = useCallback((productKey: number) => {
        // Combine both state updates into one
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
        const product = products.find(p => p.key === productId);
        if (!product || !quantities[productId]) return;

        const quantity = parseInt(quantities[productId]);
        
        // Validate quantity against stock
        if (quantity > product.stocks) {
            const errorMessage = `Cannot add ${quantity} items. Only ${product.stocks} available in stock.`;
            setErrors(prev => ({
                ...prev,
                [productId]: errorMessage
            }));
            onError?.(errorMessage);
            return;
        }

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
            total: product.sellingPrice * quantity
        };

        // Clear error on successful add
        setErrors(prev => ({
            ...prev,
            [productId]: ''
        }));
        
        onAddToCart(cartItem);
        setQuantities(prev => ({ ...prev, [productId]: "1" }));
    };
    
    return (
        <View style={styles.content}>
            {/* Products List - Left Side */}

            <ScrollView style={styles.leftPanel}>
                <Searchbar
                        placeholder="Search products"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                    />
                {filteredProducts.map(product => (
                    <Card key={product.key} style={styles.productCard}>
                        <Card.Content>
                            <View style={styles.cardLayout}>
                                {/* Left side - Product info */}
                                <View style={styles.productInfo}>
                                    <Text variant="titleMedium">{product.name}</Text>
                                    <View style={styles.detailsRow}>
                                        <Text variant="bodyMedium">₱{product.sellingPrice}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <View style={styles.pill}>
                                            <Text variant="bodySmall">Stocks: {product.stocks}</Text>
                                        </View>
                                        <View style={styles.pill}>
                                            <Text variant="bodySmall">Unit: {product.units}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Right side - Quantity and Add button */}
                                <View style={styles.actionSection}>
                                    <TextInput
                                        mode="outlined"
                                        label="Qty"
                                        value={quantities[product.key] || ''}
                                        onChangeText={(text) => handleQuantityChange(text, product.key)}
                                        onFocus={() => handleQuantityFocus(product.key)}
                                        onBlur={() => handleQuantityBlur(product.key)}
                                        keyboardType="numeric"
                                        style={styles.quantityInput}
                                        maxLength={5}
                                        error={!!errors[product.key]}
                                    />
                                    <Button 
                                        mode="contained" 
                                        onPress={() => handleAddItem(product.key)}
                                    >
                                        Add
                                    </Button>
                                </View>
                            </View>
                            {errors[product.key] ? (
                                <HelperText type="error" visible={true}>
                                    {errors[product.key]}
                                </HelperText>
                            ) : null}
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            {/* Cart - Right Side */}
            <View style={styles.rightPanel}>
            <Text variant="headlineMedium">Cart</Text>
                <ScrollView>
                    {cart.items.map(item => (
                        <List.Item
                            key={item.product.key}
                            title={item.product.name}
                            description={() => (
                                <Text>Quantity: {item.quantity} | Total: ₱{item.total}</Text>
                            )}
                            right={() => (
                                <Button 
                                    mode="outlined" 
                                    onPress={() => onRemoveFromCart(item.product)}
                                >
                                    Remove
                                </Button>
                            )}
                        />
                    ))}
                </ScrollView>
                <View style={styles.summaryContainer}>
                    <Text variant="titleLarge" style={styles.total}>
                        Total: ₱{cart.total}
                    </Text>
                    <Button mode="contained" onPress={onProceed}>
                        Proceed to Finalize
                    </Button>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    rightPanel: {
        flex: 1,
        padding: 10,
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
        marginVertical: 20,
        textAlign: 'right',
        fontSize: 27,
    },
    errorText: {
        color: '#B00020', 
        fontSize: 12,
        marginTop: 4,
    },
    productCard: {
        marginBottom: 8,
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityInput: {
        width: 80, // Fixed width for quantity
    },
    summaryContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
        // Optional: Add shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    proceedButton: {
        paddingVertical: 6,
    },
    searchBar: {
        marginBottom: 10,
        elevation: 0, // Removes shadow on Android
        borderRadius: 8,
    }
});
