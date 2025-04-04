import { useState } from "react";
import { View, StyleSheet, Modal, Pressable, useWindowDimensions } from "react-native";
import { Button, IconButton, TextInput, Text, Portal} from "react-native-paper";

interface DiscountMenuFormProps {
    onApplyDiscount: (percentageDiscount?: number, flatDiscount?: number) => void;
    visible: boolean;
    onError?: (message: string) => void;
};

export const DiscountMenuForm = ({ onApplyDiscount, visible, onError }: DiscountMenuFormProps) => {

    const isPortait = useWindowDimensions().height > useWindowDimensions().width;

    const [menuVisible, setMenuVisible] = useState(visible);
    const [flatDiscount, setFlatDiscount] = useState('');
    const [percentageDiscount, setPercentageDiscount] = useState('');
    const [error, setError] = useState(false);

    const handlePercentageDiscountChange = (text: string) => {

        const numericValue = text.replace(/[^0-9]/g, '');

        if (parseInt(numericValue) > 100) {
            setError(true);
            onError?.('Percentage discount cannot exceed 100%');
        } else {
            setError(false);
        }

        if (parseInt(numericValue) <= 100) {
            setPercentageDiscount(numericValue);
        }

        setError(false);
    };

    const handleFlatDiscountChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setFlatDiscount(numericValue);
        setError(false);
    };

    const onSubmit = () => {
        const flat = parseFloat(flatDiscount) || 0;
        const percentage = parseFloat(percentageDiscount) || 0;

        if (flat > 0 || percentage > 0) {
            onApplyDiscount(percentage, flat);
            setMenuVisible(false);
            setError(false);
            onError?.('');
        } else {
            onError?.('Please enter a valid discount value.');
        }

    }

    return (
        <View style={styles.inputGroup}>
            <View style={styles.buttonGroup}>
                <Text style={{ fontSize: 12, marginTop: -7 }}>
                    Disc.
                </Text>
                <IconButton
                    icon="percent"
                    size={16}
                    mode="outlined"
                    style={ [isPortait && (styles.discountButton), !isPortait && (styles.discountButtonLandscape)] }
                    onPress={() => setMenuVisible(true)}
                />
            </View>

            <Portal>
                {menuVisible && (
                    <View style={StyleSheet.absoluteFill}>
                        <View style={[styles.popup]}>
                            <View style={styles.popupContent}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Discount:</Text>
                                <View style={styles.discountInputs}>
                                    <TextInput
                                        mode="outlined"
                                        label="Flat"
                                        value={flatDiscount}
                                        keyboardType="numeric"
                                        dense
                                        style={styles.discountInput}
                                        onChangeText={handleFlatDiscountChange}
                                        error={error}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label="Percentage"
                                        value={percentageDiscount}
                                        keyboardType="numeric"
                                        dense
                                        style={styles.discountInput}
                                        onChangeText={handlePercentageDiscountChange}
                                        error={error}
                                        right={<TextInput.Affix text="%" />}
                                    />
                                </View>

                                {error && <Text style={{ color: 'red', fontSize: 12 }}>Invalid discount value</Text>}

                                <View style={styles.inputGroup}>
                                    <Button
                                        mode="contained"
                                        onPress={onSubmit}
                                        style={{ marginTop: 8 }}
                                        disabled={!flatDiscount && !percentageDiscount}
                                    >
                                        Apply
                                    </Button>
                                    <Button
                                        mode="contained"
                                        onPress={() => setMenuVisible(false)}
                                        style={{ marginTop: 8 }}
                                    >
                                        Cancel
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </Portal>
        </View>
    );

};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    buttonGroup: {
        flexDirection: 'column', 
        alignItems: 'center',
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        // Adjust these values based on your button position
        top: 50,
        left: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    popupContent: {
        minWidth: 200,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    
    discountButton: {
        margin: 0,
        marginLeft: -8,
        borderRadius: 4,
        height: 30,
        width: 30
    },

    discountButtonLandscape: {
        margin: 0,
        marginLeft: 0,
        borderRadius: 4,
        height: 30,
        width: 30
    },
    
    menuContent: {
        padding: 8,
        marginTop: 4,
    },
    
    discountInputs: {
        flexDirection: 'row',
        gap: 8,
        padding: 4,
        minWidth: 160,
    },
    
    discountInput: {
        flex: 1,
        height: 40,
        fontSize: 12,
    },
    
    priceInput: {
        width: 70,
    },
    
    priceInputPortrait: {
        width: 50,
        height: 35,
        fontSize: 12,
    },
})