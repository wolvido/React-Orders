import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText } from "react-native-paper";
import { useState, useEffect } from "react";
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

    const handleQuantityFocus = (productKey: number) => {
        setQuantities(prev => ({ 
            ...prev, 
            [productKey]: '' 
        }));
        // Clear error on focus
        setErrors(prev => ({
            ...prev,
            [productKey]: ''
        }));
    };

    const handleQuantityBlur = (productKey: number) => {
        setQuantities(prev => ({ 
            ...prev, 
            [productKey]: prev[productKey] || '1'
        }));
    };

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
                {products.map(product => (
                    <Card key={product.key} style={styles.productCard}>
                        <Card.Content>
                            <Text variant="titleMedium">{product.name}</Text>
                            <Text variant="bodyMedium">Price: ₱{product.sellingPrice}</Text>
                            <Text variant="bodyMedium">Stock: {product.stocks}</Text>
                            <View style={styles.addItemContainer}>
                                <View style={styles.quantityContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label="Quantity"
                                        value={quantities[product.key] || ''}
                                        onChangeText={(text) => 
                                            handleQuantityChange(text, product.key)
                                        }
                                        onFocus={() => handleQuantityFocus(product.key)}
                                        onBlur={() => handleQuantityBlur(product.key)}
                                        keyboardType="numeric"
                                        style={styles.quantityInput}
                                        maxLength={5}
                                        error={!!errors[product.key]}
                                    />
                                    
                                    {errors[product.key] ? (
                                        <HelperText type="error" visible={true}>
                                            {errors[product.key]}
                                        </HelperText>
                                    ) : null}

                                </View>
                                <Button 
                                    mode="contained" 
                                    onPress={() => handleAddItem(product.key)}
                                >
                                    Add
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            {/* Cart - Right Side */}
            <View style={styles.rightPanel}>
            <Text variant="headlineMedium">Cart</Text>
                <ScrollView>
                    {cart.cartItems.map(item => (
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
                <Text variant="titleLarge" style={styles.total}>
                    Total: ₱{cart.total}
                </Text>
                <Button mode="contained" onPress={onProceed}>
                    Proceed to Finalize
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    productCard: {
        marginBottom: 10,
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
    quantityInput: {
        flex: 1,
        marginRight: 10,
    },
    total: {
        marginVertical: 20,
        textAlign: 'right',
    },
    errorText: {
        color: '#B00020', 
        fontSize: 12,
        marginTop: 4,
    },
});
