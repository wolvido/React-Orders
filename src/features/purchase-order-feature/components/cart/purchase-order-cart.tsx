import { Product } from "@/src/entities/product/type/product";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import useOrientation from "@/src/shared/lib/device/orientation-hook";
import { View, StyleSheet } from "react-native";
import { PurchaseOrderProductList } from "./product-list/purchase-order-product-list";
import { PurchaseOrderCartPanel } from "./cart-panel/purchase-order-cart-panel";
import { SummaryPanel } from "@/src/shared/ui/summary-panel";
import { useState } from "react";
import { CollapseButton } from "@/src/shared/ui/collapse-button";

interface PurchaseOrderCartProps {
    purchaseOrderLines: PurchaseOrderLine[];
    delivery: ReceivedDelivery;
    onAddToCart: (poLine: PurchaseOrderLine) => void;
    onRemoveFromCart: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export const PurchaseOrderCart = ({
    purchaseOrderLines,
    delivery,
    onAddToCart,
    onRemoveFromCart,
    onProceed,
    onError,
}: PurchaseOrderCartProps) => {
    const isPortrait = useOrientation() === 'PORTRAIT';

    const [isCartCollapsed, setIsCartCollapsed] = useState(false);

    const onToggleCollapse = () => {
        setIsCartCollapsed(!isCartCollapsed);
    };

    return (
        <View style={[styles.content, styles.contentPortrait]}>
            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
                <PurchaseOrderProductList
                    purchaseOrderLines={purchaseOrderLines}
                    onAddToCart={onAddToCart}
                    onError={onError}
                    isPortrait={isPortrait}
                />

                <CollapseButton
                    isPortrait={isPortrait}
                    isCartCollapsed={isCartCollapsed}
                    onToggleCollapse={onToggleCollapse}
                />

                <PurchaseOrderCartPanel
                    items={delivery.items}
                    isPortrait={isPortrait}
                    onRemoveFromCart={onRemoveFromCart}
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