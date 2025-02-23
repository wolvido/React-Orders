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

    const handleAdd = () => {
        const numericValue = parseInt(quantity);
        if (numericValue) {
            onAdd(productId, numericValue);
            setQuantity(''); // Optional: clear after submit
        }
    };

    return (
        <View style={[styles.actionSection, isPortrait && styles.actionSectionPortrait]}>
            <TextInput
                mode="outlined"
                label="Qty"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={[styles.quantityInput, isPortrait && styles.quantityInputPortrait]}
                maxLength={5}
                error={!!error}
            />
            {isPortrait ? (
                <IconButton
                    icon="chevron-right"
                    mode="contained"
                    size={20}
                    onPress={handleAdd}
                />
            ) : (
                <Button
                    mode="contained"
                    onPress={handleAdd}
                >
                    Add
                </Button>
            )}
        </View>
    );
});

export default ProductQuantityForm;


const styles = StyleSheet.create({
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
        width: 50,
        height: 35, // reduced height
        fontSize: 12,
    },
    
});
