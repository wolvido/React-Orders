import { View, StyleSheet } from "react-native";
import { ReceivedDelivery } from "@/src/entities/received-delivery/type/received-delivery";
import { Product } from "@/src/entities/product/type/product";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import useOrientation from "@/src/shared/lib/device/orientation-hook";
import styles from "./delivery-styles";
import { DeliveryCartPanel } from "./delivery-cart-panel";
import { SummaryPanel } from "@/src/shared/ui/summary-panel";
import { DeliveryProductList } from "./delivery-product-list";

interface DeliveryCartProps {
    products: Product[];
    delivery: ReceivedDelivery;
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onRemoveFromDelivery: (product: Product) => void;
    onProceed: () => void;
    onError?: (message: string) => void;
}

export function DeliveryCart({
    products,
    delivery,
    onAddToDelivery,
    onRemoveFromDelivery,
    onProceed,
    onError
}: DeliveryCartProps) {
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

