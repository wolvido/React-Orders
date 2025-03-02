import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { FlatList } from "react-native";
import { CartItem } from "@/entities/cart-item";
import styles from "./cart-styles";
import { CollapseButton } from "../collapse-button";
import { useState } from "react";

interface CartPanelProps {
    items: CartItem[];
    isPortrait: boolean;
    onRemoveFromCart: (cartItem: CartItem) => void;
    collapsible?: boolean;
}

export function CartPanel({
    items,
    isPortrait,
    onRemoveFromCart,
    collapsible
}: CartPanelProps) {

    const [isCartCollapsed, setIsCartCollapsed] = useState(false);

    const onToggleCollapse = () => {
        setIsCartCollapsed(!isCartCollapsed);
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={[
            styles.cartItemWrapper,
            { borderLeftColor: item.product.isBundle ? '#FFD700' : '#2196F3' }
        ]}>
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
                    onPress={() => onRemoveFromCart(item)}
                    style={styles.removeButton}
                />
            </View>
        </View>
    );

    return (
        <View style={[
            styles.rightPanel,
            styles.rightPanelPortrait,
            isCartCollapsed && styles.rightPanelCollapsed
        ]}>
            
            {collapsible && (
                <CollapseButton
                    isPortrait={isPortrait}
                    isCartCollapsed={isCartCollapsed}
                    onToggleCollapse={onToggleCollapse}
                />
            )}

            {!isCartCollapsed && (
                <View style={styles.cartContent}>
                    <Text variant="headlineMedium">Cart</Text>
                    <FlatList
                        data={items}
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
}