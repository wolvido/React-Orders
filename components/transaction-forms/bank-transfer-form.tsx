import PaymentMethod from "@/entities/payment-method";
import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { DatePicker } from "../date-picker";

type BankTransferPayment = Extract<PaymentMethod, { type: "Bank Transfer" }>;

interface BankTransferFormProps {
    onSubmit: (data: BankTransferPayment) => void;
}

function BankTransferForm({ onSubmit }: BankTransferFormProps) {
    const [formData, setFormData] = useState<BankTransferPayment>({
        type: "Bank Transfer",
        amount: 0,
        bankName: '',
        id: 0,
        depositDate: new Date()
    });

    // Add input state to handle decimal input properly
    const [amountInput, setAmountInput] = useState('0');
    const [idInput, setIdInput] = useState('');

    const handleAmountChange = (value: string) => {
        // Allow empty string, numbers, and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmountInput(value);
            setFormData(prev => ({
                ...prev,
                amount: parseFloat(value) || 0
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
        formData.amount > 0 && 
        formData.bankName.trim() !== '' && 
        formData.id > 0;

    return (
        <View style={{ gap: 10, padding: 16 }}>

            <TextInput
                mode="outlined"
                label="Amount"
                value={amountInput}
                onChangeText={handleAmountChange}
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
