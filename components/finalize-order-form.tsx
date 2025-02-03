import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useState } from 'react';

interface OrderFormProps {
    onFormChange: (data: { remarks: string; deliveryAddress: string }) => void;
}

export default function OrderFormFinal({ onFormChange }: OrderFormProps) {
    const [isPickup, setIsPickup] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const handlePickupToggle = (isPickupSelected: boolean) => {
        setIsPickup(isPickupSelected);
        if (isPickupSelected) {
            setDeliveryAddress('pickup');
            onFormChange({ remarks, deliveryAddress: 'pickup' });
        } else {
            setDeliveryAddress('');
            onFormChange({ remarks, deliveryAddress: '' });
        }
    };

    const handleRemarksChange = (text: string) => {
        setRemarks(text);
        onFormChange({ remarks: text, deliveryAddress });
    };

    const handleAddressChange = (text: string) => {
        setDeliveryAddress(text);
        onFormChange({ remarks, deliveryAddress: text });
    };

    return (
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
                <Button
                    mode={!isPickup ? "contained" : "outlined"}
                    onPress={() => handlePickupToggle(false)}
                    style={[styles.toggleButton, styles.leftButton]}
                    contentStyle={styles.buttonContent}
                >
                    Delivery
                </Button>
                <Button
                    mode={isPickup ? "contained" : "outlined"}
                    onPress={() => handlePickupToggle(true)}
                    style={[styles.toggleButton, styles.rightButton]}
                    contentStyle={styles.buttonContent}
                >
                    Pickup
                </Button>

            </View>

            {!isPickup && (
                <View>
                    <TextInput
                        mode="outlined"
                        label="Delivery Address"
                        value={deliveryAddress}
                        onChangeText={handleAddressChange}
                        multiline
                        numberOfLines={2}
                        style={styles.input}
                    />
                    {!deliveryAddress && (
                        <HelperText type="info">
                            Please enter delivery address
                        </HelperText>
                    )}
                </View>
            )}

            <TextInput
                mode="outlined"
                label="Remarks"
                value={remarks}
                onChangeText={handleRemarksChange}
                multiline
                numberOfLines={3}
                style={styles.input}
            />

        </View>

        
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 16,
    },
    input: {
        backgroundColor: 'white',
        fontSize: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 0,
    },
    toggleButton: {
        flex: 1,
        borderRadius: 0,
    },
    leftButton: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    rightButton: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    buttonContent: {
        height: 45,
    }
});