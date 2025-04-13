import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { useState } from "react";
import { PurchaseOrderProductItem } from "./product-item/purchase-order-product-item";
import { View, StyleSheet, FlatList } from "react-native";
import { Searchbar, Text } from "react-native-paper";

interface PurchaseOrderProductListProps {
    purchaseOrderLines: PurchaseOrderLine[];
    onAddToCart: (poLine: PurchaseOrderLine) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export const PurchaseOrderProductList = ({
    purchaseOrderLines,
    onAddToCart,
    onError,
    isPortrait
}: PurchaseOrderProductListProps) => {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = purchaseOrderLines.filter(poLine =>
        poLine.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    );

    const renderProductItem = ({ item: poLine }: { item: PurchaseOrderLine }) => (
        <PurchaseOrderProductItem
            purchaseOrderLine={poLine}
            onAddToCart={onAddToCart}
            onError={onError}
            isPortrait={isPortrait}
        />
    );

    return (
        <View style={[styles.mainContentPortrait]}>
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
                maxToRenderPerBatch={15}
                windowSize={3}
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="always"
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        {searchQuery ? "No products found" : "No products available"}
                    </Text>
                )}
            />
        </View>
    );


}

const styles = StyleSheet.create({
    mainContentPortrait:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    searchBar: {
        marginTop: 10,
        elevation: 0, // Removes shadow on Android
        borderRadius: 8,
    },
    productsList: {
        height: 10,
    },
    emptyText: {
        textAlign: 'center',
        padding: 16,
        color: '#666',
    },
});