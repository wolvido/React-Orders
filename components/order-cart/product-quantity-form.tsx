import { memo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";

interface ProductQuantityFormProps {
    productId: number;
    onAdd: (productId: number, quantity: number) => void;
    error?: string;
    isPortrait?: boolean;
}

const ProductQuantityForm = memo(({ 
    productId, 
    onAdd,
    error,
    isPortrait 
}: ProductQuantityFormProps) => {
    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (text: string) => {
        // Remove any non-numeric characters
        const numericValue = text.replace(/[^0-9]/g, '');
        setQuantity(numericValue);
    };

    const handleAdd = () => {
        const numericValue = parseInt(quantity);

        if (numericValue) {
            onAdd(productId, numericValue);
            setQuantity('');
        }
    };

    return (
        <View style={[styles.actionSection, isPortrait && styles.actionSectionPortrait, !isPortrait && styles.actionSectionLandscape]}>
            {!isPortrait && (
                <Button
                    mode="contained"
                    onPress={handleAdd}
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
                error={!!error}
            />
            {isPortrait && (
                <IconButton
                    icon="chevron-right"
                    mode="contained"
                    size={25}
                    onPress={handleAdd}
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
