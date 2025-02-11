import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Card, Text, List } from "react-native-paper";
import { ReceivedDelivery } from "@/entities/received-delivery";
import { ReceivedItem } from "@/entities/received-item";

interface ReceiveDeliveryCartComponentProps {
    receivedDelivery: ReceivedDelivery;
    onProceed: (selectedDelivery: ReceivedDelivery) => void;
    onError?: (message: string) => void;
}

//receives a delivery type as cart items, also submits a delivery type
export function ReceiveDeliveryCartComponent({ 
    receivedDelivery, 
    onProceed,
    onError 
}: ReceiveDeliveryCartComponentProps) {
    // State to manage available items and cart items
    const [availableItems, setAvailableItems] = useState<ReceivedItem[]>(receivedDelivery.items);
    const [cartItems, setCartItems] = useState<ReceivedItem[]>([]);

    // Calculate total based on cart items
    const cartTotal = cartItems.reduce((sum, item) => 
        sum + (item.product.costPrice * item.quantity), 0
    );

    const handleAddToCart = (item: ReceivedItem) => {
        setAvailableItems(prev => prev.filter(i => i.product.key !== item.product.key));
        setCartItems(prev => [...prev, item]);
    };

    const handleRemoveFromCart = (item: ReceivedItem) => {
        setCartItems(prev => prev.filter(i => i.product.key !== item.product.key));
        setAvailableItems(prev => [...prev, item]);
    };

    const handleProceed = () => {
        if (cartItems.length === 0) {
            onError?.("No items selected for receiving");
            return;
        }

        const selectedDelivery: ReceivedDelivery = {
            items: cartItems,
            total: cartTotal
        };

        onProceed(selectedDelivery);
    };
    
    return (
        <View style={styles.content}>
            {/* Available Items List - Left Side */}
            <ScrollView style={styles.leftPanel}>
                <Text variant="headlineMedium" style={styles.panelTitle}>
                    Available Items
                </Text>
                {availableItems.map(item => (
                    <Card key={item.product.key} style={styles.productCard}>
                        <Card.Content>
                            <View style={styles.cardLayout}>
                                <View style={styles.productInfo}>
                                    <Text variant="titleMedium">{item.product.name}</Text>
                                    <View style={styles.detailsRow}>
                                        <Text variant="bodyMedium">₱{item.product.costPrice}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <View style={styles.pill}>
                                            <Text variant="bodySmall">Quantity: {item.quantity}</Text>
                                        </View>
                                        <View style={styles.pill}>
                                            <Text variant="bodySmall">Unit: {item.product.unitType}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.actionSection}>
                                    <Button 
                                        mode="contained" 
                                        onPress={() => handleAddToCart(item)}
                                    >
                                        Add
                                    </Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            {/* Cart Items - Right Side */}
            <View style={styles.rightPanel}>
                <Text variant="headlineMedium" style={styles.panelTitle}>
                    Selected Items
                </Text>
                <ScrollView style={styles.cartList}>
                    {cartItems.map(item => (
                        <List.Item
                            key={item.product.key}
                            title={item.product.name}
                            description={() => (
                                <Text>
                                    Quantity: {item.quantity} | 
                                    Total: ₱{(item.product.costPrice * item.quantity).toFixed(2)}
                                </Text>
                            )}
                            right={() => (
                                <Button 
                                    mode="outlined" 
                                    onPress={() => handleRemoveFromCart(item)}
                                >
                                    Remove
                                </Button>
                            )}
                        />
                    ))}
                </ScrollView>

                <View style={styles.summaryContainer}>
                    <Text variant="titleLarge" style={styles.total}>
                        Total: ₱{cartTotal.toFixed(2)}
                    </Text>
                    <Button 
                        mode="contained" 
                        onPress={handleProceed}
                        disabled={cartItems.length === 0}
                    >
                        Submit
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
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
        display: 'flex',
        flexDirection: 'column',
    },
    panelTitle: {
        marginBottom: 16,
    },
    cartList: {
        flex: 1,
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
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    summaryContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    total: {
        marginVertical: 20,
        textAlign: 'right',
        fontSize: 27,
    }
});
