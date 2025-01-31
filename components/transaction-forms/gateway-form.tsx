import PaymentMethod from "@/entities/payment-method";
import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';

type PaymentGateway = Extract<PaymentMethod, { type: "Payment gateway" }>;

function GatewayForm() {
    const [formData, setFormData] = useState<PaymentGateway>({
        type: "Payment gateway",
        paymentProvider: '',
        id: 0,
        transactionFee: 0
    });

    // Add input state to handle decimal input properly
    const [feeInput, setFeeInput] = useState('0');
    const [idInput, setIdInput] = useState('');

    // Payment provider options
    const providers = [
        { value: 'gcash', label: 'GCash' },
        { value: 'maya', label: 'Maya' },
        { value: 'paypal', label: 'Paypal'}
    ];

    const handleFeeChange = (value: string) => {
        // Allow empty string, numbers, and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setFeeInput(value);
            setFormData(prev => ({
                ...prev,
                transactionFee: parseFloat(value) || 0
            }));
        }
    };

    const handleIdChange = (value: string) => {
        // Only allow numbers
        if (value === '' || /^\d*$/.test(value)) {
            setIdInput(value);
            setFormData(prev => ({
                ...prev,
                id: parseInt(value) || 0
            }));
        }
    };

    const handleProviderChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            paymentProvider: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form Submitted with data:', formData);
    };

    const isFormValid = 
        formData.transactionFee >= 0 && 
        formData.paymentProvider.trim() !== '' && 
        formData.id > 0;

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <SegmentedButtons
                value={formData.paymentProvider}
                onValueChange={handleProviderChange}
                buttons={providers}
            />
            <HelperText type="error" visible={formData.paymentProvider === ''}>
                Please select a payment provider
            </HelperText>

            <TextInput
                mode="outlined"
                label="Reference ID"
                value={idInput}
                onChangeText={handleIdChange}
                keyboardType="numeric"
            />
            <HelperText type="error" visible={formData.id <= 0}>
                Reference ID is required
            </HelperText>

            <TextInput
                mode="outlined"
                label="Transaction Fee"
                value={feeInput}
                onChangeText={handleFeeChange}
                keyboardType="decimal-pad"
            />
            <HelperText type="error" visible={formData.transactionFee < 0}>
                Transaction fee cannot be negative
            </HelperText>

            <Button 
                mode="contained" 
                onPress={handleSubmit}
                disabled={!isFormValid}
            >
                Process Payment
            </Button>
        </View>
    );
}

export default GatewayForm;
