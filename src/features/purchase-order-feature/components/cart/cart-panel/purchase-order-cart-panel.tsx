import { View, StyleSheet } from "react-native";
import { Text, IconButton, Card } from "react-native-paper";
import { FlatList } from "react-native";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { Product } from "@/src/entities/product/type/product";
import { CollapseButton } from "@/src/shared/ui/collapse-button";
import { useState } from "react";

interface PurchaseOrderCartPanelProps {
    items: ReceivedItem[];
    isPortrait: boolean;
    onRemoveFromCart: (product: Product) => void;
    collapsible?: boolean;
}

export const PurchaseOrderCartPanel = ({
    items,
    isPortrait,
    onRemoveFromCart,
    collapsible
}: PurchaseOrderCartPanelProps) => {
    const [isCartCollapsed, setIsCartCollapsed] = useState(false);
    
    const onToggleCollapse = () => {
        setIsCartCollapsed(!isCartCollapsed);
    }

    const renderCartItem = ({ item }: { item: ReceivedItem }) => (
        <Card style={styles.cartItemWrapper}>
            <Card.Content style={styles.cartItemContent}>
                <View style={styles.mainSection}>
                    <View style={styles.leftSection}>
                        <Text variant="bodyMedium" numberOfLines={1} style={styles.productName}>
                            {item.product.name}
                        </Text>
                        
                        <View style={styles.priceRow}>
                            <Text variant="bodyMedium">
                                Base Cost: ₱{(item.manualPrice ?? item.product.costPrice) * item.quantity}
                            </Text>

                            {(item.discountPercentage || item.discountFlat) ? (
                                <>
                                <Text> • </Text>
                                <Text variant="bodyMedium" style={styles.discountText}> 
                                    Discount:
                                    {(item.discountPercentage ?? 0) > 0 &&
                                        `${item.discountPercentage}%`
                                    }
                                    {(item.discountFlat ?? 0) > 0 && (item.discountPercentage ?? 0) > 0 &&
                                        ` + `
                                    }
                                    {(item.discountFlat ?? 0) > 0 && (
                                        `₱${(item.discountFlat || 0) * item.quantity} off`
                                    )}
                                </Text>
                                </>
                            ): null}

                        </View>
                    </View>
    
                    <View style={styles.rightSection}>
                        <Text variant="bodyMedium" style={styles.totalText}>
                            ₱{item.total.toFixed(2)}
                        </Text>
                        <Text variant="bodyMedium" style={styles.quantityText}>
                            | Qty: {item.quantity}
                        </Text>
                        <IconButton
                            icon="delete-outline"
                            size={20}
                            onPress={() => onRemoveFromCart(item.product)}
                            style={styles.removeButton}
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
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
    
const styles = StyleSheet.create({
    cartItemWrapper: {
        marginHorizontal: 4,
        marginVertical: 2,
        elevation: 2,
    },
    cartItemContent: {
        padding: 8,
        paddingVertical: 4,
    },
    mainSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSection: {
        flex: 1,
        gap: 3,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    productName: {
        fontWeight: '600',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    discountText: {
        color: '#00796B',
    },
    totalText: {
        fontWeight: '500',
        color: '#1976D2',
    },
    quantityText: {
        color: '#666',
    },
    removeButton: {
        margin: 0,
        padding: 0,
    },
    emptyText: {
        textAlign: 'center',
        padding: 16,
        color: '#666',
    },
    cartListContent: {
        padding: 4,
    },
    cartList: {
        flex: 1, // This ensures the list is scrollable
    },
    cartContent: {
        flex: 1,
        padding: 10,
        paddingTop: 15, // Give space for the collapse button
    },
    rightPanel: {
        flex: 1,
        backgroundColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        position: 'relative',
    },
    rightPanelPortrait: {
        flex: 1, // cart height in portrait
    },
    rightPanelCollapsed: {
        flex: 0.01, // When collapsed, take minimal space
    },
    cartItemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#666',
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    cartItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },
    cartItemInfo: {
        flex: 1,
    },
});