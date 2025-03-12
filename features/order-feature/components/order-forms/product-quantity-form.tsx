import { memo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { Product } from "@/shared/entities/product";

interface ProductQuantityFormProps {
    product: Product;
    onAdd: (product: Product, quantity: number) => {success: boolean, error?: string};
    isPortrait?: boolean;
    onError?: (message: string) => void;
}

const ProductQuantityForm = memo(({ 
    product,
    onAdd,
    onError,
    isPortrait
}: ProductQuantityFormProps) => {
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(false);

    const handleQuantityChange = (text: string) => {
        // Remove any non-numeric characters
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantity(numericValue);
    };

    const handleAdd = (product: Product, quantityString: string) => {
        const quantity = parseInt(quantityString);

        if (quantity > 0) {
            const result = onAdd(product, quantity);

            console.log("quantity form Add to cart:", result.success);

            if (!result.success) {
                setError(!!result.error);
                onError?.(result.error || 'Failed to add item');
            }
            else{
                setError(false);
                onError?.('');
                setQuantity('');
            }
        }
        // else{
        //     setError(true);
        //     onError?.('Invalid quantity:'+ quantityString);
        // }
    };

    return (
        <View style={[styles.actionSection, isPortrait && styles.actionSectionPortrait, !isPortrait && styles.actionSectionLandscape]}>
            {!isPortrait && (
                <Button
                    mode="contained"
                    onPress={() => handleAdd(product, quantity)}
                >
                    Add
                </Button>
            )}
            <TextInput
                mode="outlined"
                label="Qty"
                value={quantity}
                onChangeText={handleQuantityChange}
                keyboardType="numeric"
                style={[styles.quantityInput, isPortrait && styles.quantityInputPortrait]}
                maxLength={5}
                error={error}
                focusable={true}
                autoComplete="off"
                importantForAutofill="no"
                textContentType="none"
            />
            {isPortrait && (
                <IconButton
                    icon="chevron-right"
                    mode="contained"
                    size={25}
                    onPress={() => handleAdd(product, quantity)}
                />
            )}
        </View>
    );
});

export default ProductQuantityForm;


const styles = StyleSheet.create({
    actionSectionLandscape: {
        marginEnd: 20
    },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    actionSectionPortrait: {
        gap: 4,
        justifyContent: 'flex-end',
    },
    quantityInput: {
        width: 80,
    },
    quantityInputPortrait: {
        width: 80,
        height: 40, // reduced height
        fontSize: 12,
    },
    
});
