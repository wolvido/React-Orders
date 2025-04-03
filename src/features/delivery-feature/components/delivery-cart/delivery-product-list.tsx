import { Product } from "@/src/entities/product/type/product";
import { View, FlatList } from "react-native";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { useState } from "react";
import { Text, Searchbar } from "react-native-paper";
import styles from "./delivery-styles";
import { DeliveryProductItem } from "./delivery-product-item";

interface DeliveryProductListProps {
    products: Product[];
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export function DeliveryProductList({
    products,
    onAddToDelivery,
    onError,
    isPortrait
}: DeliveryProductListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    products = products.filter(product => !product.isBundle);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderProductItem = ({ item: product }: { item: Product }) => (
        <DeliveryProductItem
            product={product}
            onAddToDelivery={onAddToDelivery}
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