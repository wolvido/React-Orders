import PaymentMethod from "@/src/entities/payment-method/type/payment-method";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';

type CashPayment = Extract<PaymentMethod, { type: "Cash" }>;

interface CashFormProps {
    onSubmit: (data: CashPayment) => void;
    orderId: number;
    amount: number;
    orderBalance: number;
}

function CashForm({ onSubmit, orderId, amount, orderBalance }: CashFormProps) {
    const [formData, setFormData] = useState<CashPayment>({
        id: 0,
        orderId: orderId,
        type: "Cash",
        cashTendered: 0,
        changeDue: 0,
        balance: orderBalance,
        customerId: 0
    });

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            amount: amount
        }));
    }, [amount]);

    // Add input state to handle decimal input properly
    const [inputValues, setInputValues] = useState({
        amountDue: '0',
        cashTendered: '0'
    });

    const handleInputChange = (field: 'amountDue' | 'cashTendered', value: string) => {
        // Allow empty string, numbers, and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setInputValues(prev => ({
                ...prev,
                [field]: value
            }));

            const numValue = parseFloat(value) || 0;
            
            setFormData(prevData => {
                const newData = {
                    ...prevData,
                    [field]: numValue
                };
                
                if (field === 'amountDue') {
                    newData.changeDue = prevData.cashTendered - numValue;
                } else if (field === 'cashTendered') {
                    newData.changeDue = numValue - amount;
                }

                return newData;
            });
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <TextInput
                mode="outlined"
                label="Amount Due"
                value={amount.toFixed(2)}
                onChangeText={(value) => handleInputChange('amountDue', value)}
                keyboardType="decimal-pad"
                editable={false}
                style={{ display: 'none' }}

            />
            <TextInput
                mode="outlined"
                label="Cash Tendered"
                value={inputValues.cashTendered}
                onChangeText={(value) => handleInputChange('cashTendered', value)}
                keyboardType="decimal-pad"
            />
            <TextInput
                mode="outlined"
                label="Change Due"
                value={formData.changeDue.toFixed(2)}
                editable={false}
                keyboardType="decimal-pad"
            />
            <Button 
                mode="contained" 
                onPress={handleSubmit}
                disabled={formData.cashTendered < amount}
            >
                Process Payment
            </Button>
        </View>
    );
}

export default CashForm;
