import PaymentMethod from "@/src/entities/payment-method/type/payment-method";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { DatePicker } from "../../../../shared/components/date-picker";

type ChequePayment = Extract<PaymentMethod, { type: "Cheque" }>;

interface ChequeFormProps {
    onSubmit: (data: ChequePayment) => void;
    orderId: number;
    orderBalance: number;
}

function ChequeForm({ onSubmit, orderId, orderBalance }: ChequeFormProps) {
    const [formData, setFormData] = useState<ChequePayment>({
        orderId: orderId,
        type: "Cheque",
        chequeNumber: '',
        bankName: '',
        payment: 0,
        remark: '',
        chequeDate: new Date(),
        balance: orderBalance,
        id: 0,
        customerId: 0
    });

    // Add input state to handle decimal input for amount
    const [paymentInput, setPaymentInput] = useState('0');

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
        formData.payment > 0;

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
                value={paymentInput}
                onChangeText={handlePaymentChange}
                keyboardType="decimal-pad"
            />
            <TextInput
                mode="outlined"
                label="Remark"
                value={formData.remark}
                onChangeText={(value) => handleInputChange('remark', value)}
                multiline
            />

            <DatePicker
                label="Date"
                value={formData.chequeDate}
                onChange={(value) => value && handleDateChange(value)}
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
