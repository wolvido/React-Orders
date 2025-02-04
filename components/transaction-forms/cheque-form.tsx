import PaymentMethod from "@/entities/payment-method";
import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

type ChequePayment = Extract<PaymentMethod, { type: "Cheque" }>;

interface ChequeFormProps {
    onSubmit: (data: ChequePayment) => void;
}

function ChequeForm({ onSubmit }: ChequeFormProps) {
    const [formData, setFormData] = useState<ChequePayment>({
        type: "Cheque",
        chequeNumber: '',
        bankName: '',
        amount: 0,
        remark: '',
        chequeDate: new Date()
    });

    // Add input state to handle decimal input for amount
    const [amountInput, setAmountInput] = useState('0');

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

    const handleChequeNumberChange = (value: string) => {
        // Only allow numbers, no decimals
        if (value === '' || /^\d*$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                chequeNumber: value
            }));
        }
    };

    const handleInputChange = (field: keyof Omit<ChequePayment, 'type' | 'amount' | 'chequeDate' | 'chequeNumber'>, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDateChange = (date: Date) => {
        setFormData(prev => ({
            ...prev,
            chequeDate: date
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const isFormValid = 
        formData.chequeNumber !== '' && 
        formData.bankName !== '' && 
        formData.amount > 0;

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <TextInput
                mode="outlined"
                label="Cheque Number"
                value={formData.chequeNumber}
                onChangeText={handleChequeNumberChange}
                keyboardType="numeric"
            />
            <TextInput
                mode="outlined"
                label="Bank Name"
                value={formData.bankName}
                onChangeText={(value) => handleInputChange('bankName', value)}
            />
            <TextInput
                mode="outlined"
                label="Amount"
                value={amountInput}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
            />
            <TextInput
                mode="outlined"
                label="Remark"
                value={formData.remark}
                onChangeText={(value) => handleInputChange('remark', value)}
                multiline
            />

            <DatePickerInput
                locale="en"
                label="Date"
                value={formData.chequeDate}
                onChange={(value) => value && handleDateChange(value)}
                inputMode="start"
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

export default ChequeForm;
