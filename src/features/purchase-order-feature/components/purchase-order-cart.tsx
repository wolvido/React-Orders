import { Product } from "@/src/entities/product/type/product";
import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import useOrientation from "@/src/shared/lib/device/orientation-hook";
import { View, StyleSheet } from "react-native";

interface PurchaseOrderCartProps {
    purchaseOrderLines: PurchaseOrderLine[];
    deliveryCart: ReceivedDelivery;
    onAddToCart: (poLine: PurchaseOrderLine) => void;
    onRemoveFromCart: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export const PurchaseOrderCart = ({
    purchaseOrderLines,
    deliveryCart,
    onAddToCart,
    onRemoveFromCart,
    onProceed,
    onError,
}: PurchaseOrderCartProps) => {
    const isPortrait = useOrientation() === 'PORTRAIT';

    return (
        <View style={[styles.content, styles.contentPortrait]}>
            <View style={[styles.content, isPortrait && styles.contentPortrait, !isPortrait && styles.landscapeContentPortrait]}>
            </View>
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
        gap: 10,
    },
});