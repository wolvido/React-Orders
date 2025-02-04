import PaymentMethod from "@/entities/payment-method";
import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';

type CashPayment = Extract<PaymentMethod, { type: "Cash" }>;

function CashForm() {
    const [formData, setFormData] = useState<CashPayment>({
        id: Math.floor(Math.random() * 1000000) + 1,
        type: "Cash",
        amountDue: 0,
        cashTendered: 0,
        changeDue: 0
    });

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
                    newData.changeDue = numValue - prevData.amountDue;
                }

                return newData;
            });
        }
    };

    const handleSubmit = () => {
        console.log('Form Submitted with data:', formData);
    };

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <TextInput
                mode="outlined"
                label="Amount Due"
                value={inputValues.amountDue}
                onChangeText={(value) => handleInputChange('amountDue', value)}
                keyboardType="decimal-pad"
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
                disabled={formData.cashTendered < formData.amountDue}
            >
                Process Payment
            </Button>
        </View>
    );
}

export default CashForm;
