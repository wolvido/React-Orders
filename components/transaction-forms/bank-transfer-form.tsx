import PaymentMethod from "@/entities/payment-method";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { DatePicker } from "../date-picker";

type BankTransferPayment = Extract<PaymentMethod, { type: "Bank Transfer" }>;

interface BankTransferFormProps {
    onSubmit: (data: BankTransferPayment) => void;
    orderId: number;
}

function BankTransferForm({ onSubmit, orderId }: BankTransferFormProps) {
    const [formData, setFormData] = useState<BankTransferPayment>({
        orderId: orderId,
        type: "Bank Transfer",
        payment: 0,
        bankName: '',
        id: 0,
        depositDate: new Date()
    });


    // Add input state to handle decimal input properly
    const [paymentInput, setPaymentInput] = useState('0');
    const [idInput, setIdInput] = useState('');

    const handlePaymentChange = (value: string) => {
        // Allow empty string, numbers, and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setPaymentInput(value);
            setFormData(prev => ({
                ...prev,
                payment: parseFloat(value) || 0
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

    const handleBankNameChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            bankName: value
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData(prev => ({
                ...prev,
                depositDate: date
            }));
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const isFormValid = 
        formData.payment > 0 && 
        formData.bankName.trim() !== '' && 
        formData.id > 0;

    return (
        <View style={{ gap: 10, padding: 16 }}>

            <TextInput
                mode="outlined"
                label="Amount"
                value={paymentInput}
                onChangeText={handlePaymentChange}
                keyboardType="decimal-pad"
            />

            <TextInput
                mode="outlined"
                label="Bank Name"
                value={formData.bankName}
                onChangeText={handleBankNameChange}
            />

            <TextInput
                mode="outlined"
                label="Reference ID"
                value={idInput}
                onChangeText={handleIdChange}
                keyboardType="numeric"
            />

            <DatePicker
                label="Deposit Date"
                value={formData.depositDate}
                onChange={handleDateChange}
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

export default BankTransferForm;
