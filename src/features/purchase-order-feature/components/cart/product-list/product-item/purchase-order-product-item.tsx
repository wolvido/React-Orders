import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { PurchaseOrderProductForm } from "../../../purchase-order-product-form";
import { Card, HelperText, Text } from "react-native-paper";

interface PurchaseOrderProductItemProps {
    purchaseOrderLine: PurchaseOrderLine;
    onAddToCart: (poLine: PurchaseOrderLine) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export const PurchaseOrderProductItem = ({
    purchaseOrderLine,
    onAddToCart,
    onError,
    isPortrait
}: PurchaseOrderProductItemProps) => {

    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [subtotal, setSubtotal] = useState<number>(purchaseOrderLine.totalPrice);

    const handleError = (poLineId: number, error: string) => {
        setErrors(prev => ({
            ...prev,
            [poLineId]: error
        }));

        onError?.(error);
    };

    const handleSubtotal = (subtotal: number) => {
        setSubtotal(subtotal);
    };

    const purchaseOrderProductForm = (purchaseOrderLine: PurchaseOrderLine) => {
        return (
            <PurchaseOrderProductForm
                poLine={purchaseOrderLine}
                onAdd={onAddToCart}
                onError={(error) => handleError(purchaseOrderLine.id, error)}
                isPortrait={isPortrait}
                onSubTotalChange={handleSubtotal}
            />
        );
    };


    return (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>
                    {!isPortrait && purchaseOrderProductForm(purchaseOrderLine)}

                    <View style={styles.productInfo}>
                        <Text
                            variant={"bodyMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={2}
                        >
                            {/* BasePrice : ₱{product.costPrice} • {product.name} */}
                            {purchaseOrderLine.product?.name}
                        </Text>
                    </View>

                    <View style={styles.stockInfo}>
                        <Text variant="bodySmall">
                        Ordered/Received: {purchaseOrderLine.orderedQuantity}/{purchaseOrderLine.receivedQuantity ?? 0}
                        </Text>
                    </View>

                    <View style={[styles.subTotalInfoPortrait, !isPortrait && styles.subTotalInfoLandscape]}>
                        {isPortrait && (
                            <Text variant="bodySmall">
                                Subtotal:  <Text variant="bodyMedium">₱{subtotal.toFixed(2)}</Text>
                            </Text>
                        )}

                        {!isPortrait && (
                            <>
                            <Text variant="bodySmall">
                                Subtotal:  
                            </Text>
                            <Text variant="bodyMedium">₱{subtotal.toFixed(2)}</Text>
                            </>
                        )}

                    </View>

                    {isPortrait && purchaseOrderProductForm(purchaseOrderLine)}

                </View>
                
                {errors[purchaseOrderLine.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[purchaseOrderLine.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({

    productCard: {
        marginBottom: 8,
        //paddingRight: 140
    },
    productCardPortrait: {
        marginBottom: 4,
        paddingVertical: 0, // reduced padding
        paddingRight: 0
    },
    cardContent: {
        paddingVertical: 4, // minimal padding
        paddingHorizontal: 8,
        //paddingRight: 130
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    productInfo: {
        flex: 2,
        justifyContent: 'center',
    },
    compactText: {
        fontSize: 13,
    },
    productName: {
        marginBottom: 2,
    },
    stockInfo: {
        flex: 1,
        alignItems: 'center',
    },
    subTotalInfoPortrait: {
        flex: 1,
        alignItems: 'center',
        marginRight: 23,
    },
    subTotalInfoLandscape: {
        flex: 1,
        alignItems: 'center',
        marginRight: -4,
    },
})