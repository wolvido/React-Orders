import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List } from "react-native-paper";
import StepIndicator from "@/components/order-step-indicator";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { CartContext } from "@/old-context/cart-context";
import { products } from "@/dummy-data/dummy-products";
import { CartItem } from "@/models/cart-item";

export default function AddItemsScreen() {
    const { cart, addItemsByQuantity, setOrder } = useContext(CartContext);
    const [quantities, setQuantities] = useState<{ [key: number]: string }>({});

    const handleAddItem = (productId: number) => {
        const product = products.find(p => p.key === productId);
        if (!product || !quantities[productId]) return;

        const cartItem: CartItem = {
            id: Date.now(),
            item: {
                id: product.key,
                name: product.name,
                price: product.sellingPrice,
            },
            quantity: parseInt(quantities[productId]),
            total: product.sellingPrice * parseInt(quantities[productId])
        };

        addItemsByQuantity(cartItem);
        // Clear quantity after adding
        setQuantities(prev => ({ ...prev, [productId]: '' }));
    };

    const handleRemoveItem = (itemId: number) => {
        const updatedItems = cart.cartItems.filter(item => item.id !== itemId);
        setOrder({ ...cart, cartItems: updatedItems });
    };

    return (
        <View style={styles.container}>
            <StepIndicator currentStep={2} />
            <View style={styles.content}>
                {/* Products List - Left Side */}
                <ScrollView style={styles.leftPanel}>
                    {products.map(product => (
                        <Card key={product.key} style={styles.productCard}>
                            <Card.Content>
                                <Text variant="titleMedium">{product.name}</Text>
                                <Text variant="bodyMedium">Price: ${product.sellingPrice}</Text>
                                <Text variant="bodyMedium">Stock: {product.stocks}</Text>
                                <View style={styles.addItemContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label="Quantity"
                                        value={quantities[product.key] || ''}
                                        onChangeText={(text) => 
                                            setQuantities(prev => ({ ...prev, [product.key]: text }))
                                        }
                                        keyboardType="numeric"
                                        style={styles.quantityInput}
                                    />
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
                                key={item.id}
                                title={item.item.name}
                                description={`Quantity: ${item.quantity} | Total: $${item.total}`}
                                right={() => (
                                    <Button 
                                        mode="outlined" 
                                        onPress={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            />
                        ))}
                    </ScrollView>
                    <Text variant="titleLarge" style={styles.total}>
                        Total: ${cart.total}
                    </Text>
                    <Link href="/finalize-order" asChild>
                        <Button mode="contained">
                            Proceed to Finalize
                        </Button>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    productCard: {
        marginBottom: 10,
    },
    addItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityInput: {
        flex: 1,
        marginRight: 10,
    },
    total: {
        marginVertical: 20,
        textAlign: 'right',
    }
});
