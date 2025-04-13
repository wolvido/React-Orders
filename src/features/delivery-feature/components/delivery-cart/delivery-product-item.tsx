import { Product } from "@/src/entities/product/type/product";
import { ReceivedItem } from "@/src/entities/received-item/type/received-item";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, HelperText, Text } from "react-native-paper";
import { DeliveryProductForm } from "./delivery-product-form";

interface DeliveryProductItemProps {
    product: Product;
    onAddToDelivery: (receivedItem: ReceivedItem) => void;
    onError?: (message: string) => void;
    isPortrait: boolean;
}

export const DeliveryProductItem = ({
    product,
    onAddToDelivery,
    onError,
    isPortrait
}: DeliveryProductItemProps) => {
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [subtotal, setSubtotal] = useState<number>(0);

    const handleError = (productId: number, error: string) => {
        setErrors(prev => ({
            ...prev,
            [productId]: error
        }));

        onError?.(error);
    };

    const handleSubtotal = (subtotal: number) => {
        setSubtotal(subtotal);
    };

    const deliveryProductForm = (product: Product) => {
        return (
            <DeliveryProductForm
                product={product}
                onAdd={onAddToDelivery}
                onError={(error) => handleError(product.id, error)}
                isPortrait={isPortrait}
                onSubTotalChange={handleSubtotal}
            />
        );
    };
    
    return (
        <Card style={[styles.productCard, isPortrait && styles.productCardPortrait]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardLayout}>
                    {!isPortrait && deliveryProductForm(product)}

                    <View style={styles.productInfo}>
                        <Text
                            variant={"bodyMedium"}
                            style={[isPortrait && styles.compactText, styles.productName]}
                            numberOfLines={2}
                        >
                            {/* BasePrice : ₱{product.costPrice} • {product.name} */}
                            {product.name}
                        </Text>
                    </View>

                    <View style={styles.stockInfo}>
                        <Text variant="bodySmall">
                            Stock: {product.stocks}
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
                            <Text variant="bodyMedium">₱{product.stocks}</Text>
                            </>
                        )}

                    </View>

                    {isPortrait && deliveryProductForm(product)}

                </View>
                
                {errors[product.id] && (
                    <HelperText type="error" visible={true}>
                        {errors[product.id]}
                    </HelperText>
                )}
            </Card.Content>
        </Card>
    );
}

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