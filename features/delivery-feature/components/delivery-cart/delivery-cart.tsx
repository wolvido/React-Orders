import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput, Text, List, HelperText, Searchbar, IconButton, Surface } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { ReceivedDelivery } from "@/features/delivery-feature/types/received-delivery";
import { Product } from "@/shared/entities/product";
import { ReceivedItem } from "@/features/delivery-feature/types/received-item";
import { FlatList } from "react-native";
import useOrientation from "@/shared/hooks/orientation-hook";
import DeliveryProductForm from "./delivery-product-form";
import styles from "./delivery-styles";
import { DeliveryCartPanel } from "./delivery-cart-panel";
import { SummaryPanel } from "@/shared/components/summary-panel";
import { DeliveryProductList } from "./delivery-product-list";

interface DeliveryCartComponentProps {
    products: Product[];
    delivery: ReceivedDelivery;
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onRemoveFromDelivery: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export function DeliveryCartComponent({
    products,
    delivery,
    onAddToDelivery,
    onRemoveFromDelivery,
    onProceed,
    onError
}: DeliveryCartComponentProps) {
    const isPortrait = useOrientation() === 'PORTRAIT';

    return (
        <View style={[styles.content, styles.contentPortrait]}>

            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                <DeliveryProductList
                    products={products}
                    onAddToDelivery={onAddToDelivery}
                    onError={onError}
                    isPortrait={isPortrait}
                />

                <DeliveryCartPanel
                    items={delivery.items}
                    isPortrait={isPortrait}
                    onRemoveFromDelivery={onRemoveFromDelivery}
                    collapsible={true}
                />
            </View>

            <SummaryPanel
                total={delivery.total}
                quantity={delivery.items.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
                onProceed={onProceed}
            />
        </View>
    );
}

