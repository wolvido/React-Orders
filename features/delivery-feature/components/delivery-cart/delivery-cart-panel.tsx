import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { FlatList } from "react-native";
import { ReceivedItem } from "@/entities/received-item";
import styles from "./delivery-styles";
import { Product } from "@/entities/product";
import { CollapseButton } from "@/shared/components/collapse-button";
import { useState } from "react";

interface DeliveryCartPanelProps {
    items: ReceivedItem[];
    isPortrait: boolean;
    onRemoveFromDelivery: (product: Product) => void;
    collapsible?: boolean;
}

export function DeliveryCartPanel({
    items,
    isPortrait,
    onRemoveFromDelivery,
    collapsible
}: DeliveryCartPanelProps) {

    const [isCartCollapsed, setIsCartCollapsed] = useState(false);
    
    const onToggleCollapse = () => {
        setIsCartCollapsed(!isCartCollapsed);
    } 

    const renderCartItem = ({ item }: { item: ReceivedItem }) => (
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
    );

    return(
        <View style={[
            styles.rightPanel,
            isPortrait && styles.rightPanelPortrait,
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
};