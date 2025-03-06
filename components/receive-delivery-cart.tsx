import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Button, Card, Text, TextInput, IconButton } from "react-native-paper";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { ReceivedItem } from "@/entities/received-item";
import useOrientation from "@/hooks/orientation-hook";

interface ReceiveDeliveryCartComponentProps {
    receivedDelivery: ReceivedDelivery;
    onProceed: (selectedDelivery: ReceivedDelivery) => void;
    onError?: (message: string) => void;
}

export function ReceiveDeliveryCartComponent({ 
    receivedDelivery, 
    onProceed,
    onError 
}: ReceiveDeliveryCartComponentProps) {
    const orientation = useOrientation();
    const isPortrait = orientation === 'PORTRAIT';

    const [availableItems, setAvailableItems] = useState<ReceivedItem[]>(
        receivedDelivery.items.map(item => ({
            ...item,
            total: item.quantity * item.product.price
        }))
    );
    const [cartItems, setCartItems] = useState<ReceivedItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: string }>({});
    const [prices, setPrices] = useState<{ [key: number]: string }>({});

    // Initialize quantities and prices
    useEffect(() => {
        const initialQuantities: { [key: number]: string } = {};
        const initialPrices: { [key: number]: string } = {};
        availableItems.forEach(item => {
            initialQuantities[item.product.id] = "1";
            initialPrices[item.product.id] = item.product.price.toString();
        });
        setQuantities(initialQuantities);
        setPrices(initialPrices);
    }, []);

    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    const handleQuantityChange = (text: string, productId: number, isCartItem: boolean = false) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        if (isCartItem) {
            const item = cartItems.find(i => i.product.id === productId);
            if (item) {
                const newQuantity = parseInt(numericValue) || 0;
                updateCartItemQuantity(item, newQuantity);
            }
        } else {
            setQuantities(prev => ({
                ...prev,
                [productId]: numericValue
            }));
        }
    };

    const handlePriceChange = (text: string, productId: number, isCartItem: boolean = false) => {
        const numericValue = text.replace(/[^0-9.]/g, '');
        if (isCartItem) {
            const item = cartItems.find(i => i.product.id === productId);
            if (item) {
                const newPrice = parseFloat(numericValue) || 0;
                updateCartItemPrice(item, newPrice);
            }
        } else {
            setPrices(prev => ({
                ...prev,
                [productId]: numericValue
            }));
        }
    };

    const handleAddToCart = (item: ReceivedItem) => {
        const quantity = parseInt(quantities[item.product.id]) || 0;
        const price = parseFloat(prices[item.product.id]) || 0;
    
        if (quantity <= 0) {
            onError?.("Quantity must be greater than 0");
            return;
        }
    
        if (quantity > item.quantity) {
            onError?.("Cannot add more than available quantity");
            return;
        }
    
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(cartItem => cartItem.product.id === item.product.id);
    
            if (existingItemIndex !== -1) {
                // Merge quantities if item already exists
                return prev.map((cartItem, index) => 
                    index === existingItemIndex 
                        ? { 
                            ...cartItem, 
                            quantity: cartItem.quantity + quantity, 
                            total: (cartItem.quantity + quantity) * price 
                          } 
                        : cartItem
                );
            } else {
                // Otherwise, add as a new entry
                return [...prev, { product: item.product, quantity, total: quantity * price }];
            }
        });
    
        // Update available stock
        setAvailableItems(prev =>
            prev.map(availItem =>
                availItem.product.id === item.product.id
                    ? { ...availItem, quantity: availItem.quantity - quantity }
                    : availItem
            ).filter(item => item.quantity > 0)
        );
    };
    

    const updateCartItemQuantity = (item: ReceivedItem, newQuantity: number) => {
        const availableItem = availableItems.find(i => i.product.id === item.product.id);
        const currentPrice = parseFloat(prices[item.product.id]) || item.product.price;

        setCartItems(prev => prev.map(cartItem => {
            if (cartItem.product.id === item.product.id) {
                return {
                    ...cartItem,
                    quantity: newQuantity,
                    total: newQuantity * currentPrice
                };
            }
            return cartItem;
        }));
    };

    const updateCartItemPrice = (item: ReceivedItem, newPrice: number) => {
        setCartItems(prev => prev.map(cartItem => {
            if (cartItem.product.id === item.product.id) {
                return {
                    ...cartItem,
                    total: cartItem.quantity * newPrice
                };
            }
            return cartItem;
        }));
    };

    const handleRemoveFromCart = (item: ReceivedItem) => {
        // Return quantity to available items
        const existingItem = availableItems.find(i => i.product.id === item.product.id);
        if (existingItem) {
            setAvailableItems(prev => prev.map(availItem => {
                if (availItem.product.id === item.product.id) {
                    return {
                        ...availItem,
                        quantity: availItem.quantity + item.quantity
                    };
                }
                return availItem;
            }));
        } else {
            setAvailableItems(prev => [...prev, item]);
        }

        setCartItems(prev => prev.filter(i => i.product.id !== item.product.id));
    };

    const handleProceed = () => {
        if (cartItems.length === 0) {
            onError?.("No items selected for receiving");
            return;
        }

        const selectedDelivery: ReceivedDelivery = {
            items: cartItems,
            total: cartTotal,
            deliveryId: 0,
            deliveredBy: ''
        };

        onProceed(selectedDelivery);
    };

    const renderAvailableItem = ({ item }: { item: ReceivedItem }) => (
        <Card style={styles.cartItemCard}>
            <Card.Content style={styles.cartItemContent}>
                <Text variant="titleMedium" style={styles.cartItemName} numberOfLines={1}>
                    {item.product.name}
                </Text>
                <View style={styles.cartItemInputs}>
                    <TextInput
                        mode="outlined"
                        label="Qty"
                        value={quantities[item.product.id]}
                        onChangeText={(text) => handleQuantityChange(text, item.product.id)}
                        keyboardType="numeric"
                        style={styles.cartQuantityInput}
                        dense
                    />
                    <TextInput
                        mode="outlined"
                        label="₱"
                        value={prices[item.product.id]}
                        onChangeText={(text) => handlePriceChange(text, item.product.id)}
                        keyboardType="numeric"
                        style={styles.cartPriceInput}
                        dense
                    />
                    <Text style={styles.totalText}>Avail: {item.quantity}</Text>
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => handleAddToCart(item)}
                        style={styles.deleteButton}
                    />
                </View>
            </Card.Content>
        </Card>
    );

    const renderCartItem = ({ item }: { item: ReceivedItem }) => (
        <Card style={styles.cartItemCard}>
            <Card.Content style={styles.cartItemContent}>
                <Text variant="titleMedium" style={styles.cartItemName} numberOfLines={1}>
                    {item.product.name}
                </Text>
                <View style={styles.cartItemInputs}>
                    <TextInput
                        mode="outlined"
                        label="Qty"
                        value={item.quantity.toString()}
                        onChangeText={(text) => handleQuantityChange(text, item.product.id, true)}
                        keyboardType="numeric"
                        style={styles.cartQuantityInput}
                        dense // Makes the TextInput smaller
                    />
                    <TextInput
                        mode="outlined"
                        label="₱"
                        value={(item.total / item.quantity).toString()}
                        onChangeText={(text) => handlePriceChange(text, item.product.id, true)}
                        keyboardType="numeric"
                        style={styles.cartPriceInput}
                        dense // Makes the TextInput smaller
                    />
                    <Text style={styles.totalText}>₱{item.total}</Text>
                    <IconButton
                        icon="delete"
                        size={20} // Smaller icon
                        onPress={() => handleRemoveFromCart(item)}
                        style={styles.deleteButton}
                    />
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={[
                styles.availableItemsSection,
                isPortrait ? styles.portraitAvailable : styles.landscapeAvailable
            ]}>
                <Text variant="headlineSmall" style={styles.sectionTitle}>
                    Available Items
                </Text>
                <FlatList
                    data={availableItems}
                    renderItem={renderAvailableItem}
                    keyExtractor={item => `available-${item.product.id}`}
                    contentContainerStyle={styles.listContent}
                />
            </View>

            <View style={[
                styles.cartSection,
                isPortrait ? styles.portraitCart : styles.landscapeCart
            ]}>
                <Text variant="headlineSmall" style={styles.sectionTitle}>
                    Selected Items
                </Text>
                {/* Wrap FlatList in a View with flex: 1 */}
                <View style={styles.cartListContainer}>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => `cart-${item.product.id}`}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
                {/* Footer outside of FlatList */}
                <View style={styles.cartFooter}>
                    <Text variant="headlineSmall">Total: ₱{cartTotal}</Text>
                    <Button
                        mode="contained"
                        onPress={handleProceed}
                        disabled={cartItems.length === 0}
                    >
                        Proceed
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItemCard: {
        marginBottom: 1, // Reduced margin
        marginHorizontal: 4,
    },
    cartItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8, // Reduced padding
        gap: 8,
        height: 60, // Explicit height
    },
    cartItemName: {
        flex: 1,
        fontSize: 14, // Smaller font
        marginRight: 8,
    },
    cartItemInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, // Reduced gap
    },
    cartQuantityInput: {
        width: 50, // Smaller width
        height: 40, // Explicit height
        backgroundColor: 'white',
    },
    cartPriceInput: {
        width: 70, // Smaller width
        height: 40, // Explicit height
        backgroundColor: 'white',
    },
    totalText: {
        minWidth: 60,
        textAlign: 'right',
    },
    deleteButton: {
        margin: 0, // Remove margin
    },
    cartSection: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        // Add display flex
        display: 'flex',
        flexDirection: 'column',
    },
    portraitCart: {
        height: '45%',
    },
    landscapeCart: {
        flex: 1,
        width: '40%',
    },
    cartListContainer: {
        flex: 1, // This will make the list take remaining space
        marginBottom: 8, // Add some space before footer
    },
    cartFooter: {
        height: '30%',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 8,
        // Ensure footer stays at bottom
        marginTop: 'auto', // This will push it to the bottom
        backgroundColor: '#f5f5f5',
    },
    container: {
        
    },
    availableItemsSection: {
        padding: 16,
    },
    portraitAvailable: {
        height: '50%',
    },
    landscapeAvailable: {
        flex: 1,
        width: '60%',
    },
    sectionTitle: {
        marginBottom: 0,
    },
    listContent: {
        gap: 8,
    },
    itemCard: {
        marginBottom: 8,
    },
    itemDetails: {
        marginTop: 8,
        gap: 8,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityInput: {
        width: 80,
    },
    priceInput: {
        width: 100,
    }
});
