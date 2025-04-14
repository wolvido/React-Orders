import { View, StyleSheet } from "react-native";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import { Product } from "@/src/entities/product/type/product";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import useOrientation from "@/src/shared/lib/device/orientation-hook";
import { DeliveryCartPanel } from "./delivery-cart-panel";
import { SummaryPanel } from "@/src/shared/ui/summary-panel";
import { DeliveryProductList } from "./delivery-product-list";
import { CollapseButton } from "@/src/shared/ui/collapse-button";
import { useState } from "react";

interface DeliveryCartProps {
    products: Product[];
    delivery: ReceivedDelivery;
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onRemoveFromDelivery: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export const DeliveryCart = ({
    products,
    delivery,
    onAddToDelivery,
    onRemoveFromDelivery,
    onProceed,
    onError
}: DeliveryCartProps) => {
    const isPortrait = useOrientation() === 'PORTRAIT';

    const [isCartCollapsed, setIsCartCollapsed] = useState(false);

    const onToggleCollapse = () => {
        setIsCartCollapsed(!isCartCollapsed);
    };
    
    return (
        <View style={[styles.content, styles.contentPortrait]}>

            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                <DeliveryProductList
                    products={products}
                    onAddToDelivery={onAddToDelivery}
                    onError={onError}
                    isPortrait={isPortrait}
                />

                <CollapseButton
                    isPortrait={isPortrait}
                    isCartCollapsed={isCartCollapsed}
                    onToggleCollapse={onToggleCollapse}
                />

                <DeliveryCartPanel
                    items={delivery.items}
                    isPortrait={isPortrait}
                    onRemoveFromDelivery={onRemoveFromDelivery}
                />
            </View>

            <SummaryPanel
                total={delivery.total}
                quantity={delivery.items.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
                onProceed={onProceed}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row', // side by side in landscape
    },
    contentPortrait: {
        flexDirection: 'column', // stacked in portrait
    },
    landscapeContentPortrait:{
        flexDirection: 'row',
    },
});