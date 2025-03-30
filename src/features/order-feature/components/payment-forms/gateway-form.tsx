import PaymentMethod from "@/src/entities/payment-method/type/payment-method";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper';

type PaymentGateway = Extract<PaymentMethod, { type: "Payment Gateway" }>;

interface GatewayFormProps {
    onSubmit: (data: PaymentGateway) => void;
    orderId: number;
    orderBalance: number;
}

function GatewayForm({ onSubmit, orderId, orderBalance }: GatewayFormProps) {
    const [formData, setFormData] = useState<PaymentGateway>({
        orderId: orderId,
        type: "Payment Gateway",
        paymentProvider: '',
        id: 0,
        payment: 0,
        balance: orderBalance,
        customerId: 0,
        referenceNumber: ""
    });

    // Add input state to handle decimal input properly
    const [payment, setpayment] = useState('0');
    const [idInput, setIdInput] = useState('');
    const [providerInput, setProviderInput] = useState('');

    const handlePaymentChange = (value: string) => {
        // Allow empty string, numbers, and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setpayment(value);
            setFormData(prev => ({
                ...prev,
                payment: parseFloat(value) || 0
            }));
        }
    };

    const handleIdChange = (value: string) => {
        setIdInput(value);
        setFormData(prev => ({
            ...prev,
            referenceNumber: value
        }));
    };

    const handleProviderChange = (value: string) => {
        setProviderInput(value);
        setFormData(prev => ({
            ...prev,
            paymentProvider: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const isFormValid = 
        formData.payment >= 0 && 
        formData.paymentProvider.trim() !== '' && 
        formData.referenceNumber !== '';

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <TextInput
                mode="outlined"
                label="Payment Provider"
                value={providerInput}
                onChangeText={handleProviderChange}
            />

            <TextInput
                mode="outlined"
                label="Reference ID"
                value={idInput}
                onChangeText={handleIdChange}
                keyboardType="numeric"
            />

            <TextInput
                mode="outlined"
                label="Transaction Fee"
                value={payment}
                onChangeText={handlePaymentChange}
                keyboardType="decimal-pad"
            />

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
