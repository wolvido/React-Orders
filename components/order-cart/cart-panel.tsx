import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { FlatList } from "react-native";
import { CartItem } from "@/entities/cart-item";
import styles from "./cart-styles";

interface CartPanelProps {
    items: CartItem[];
    isPortrait: boolean;
    isCartCollapsed: boolean;
    onToggleCollapse: () => void;
    onRemoveFromCart: (cartItem: CartItem) => void;
}

export function CartPanel({
    items,
    isPortrait,
    isCartCollapsed,
    onToggleCollapse,
    onRemoveFromCart
}: CartPanelProps) {
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
            <View style={[isPortrait && styles.collapseButtonContainer, !isPortrait && styles.landscapeCollapseButtonContainer]}>
                {isPortrait ? (
                    <IconButton
                        icon={isCartCollapsed ? "chevron-up" : "chevron-down"}
                        onPress={onToggleCollapse}
                        size={20}
                        mode="contained"
                    />
                ) : (
                    <IconButton
                        icon={isCartCollapsed ? "chevron-left" : "chevron-right"}
                        onPress={onToggleCollapse}
                        size={20}
                        mode="contained"
                    />
                )}
            </View>
            
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