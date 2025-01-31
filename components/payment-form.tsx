import React, { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Text, Button } from 'react-native-paper';
import CashForm from './transaction-forms/cash-form';
import ChequeForm from './transaction-forms/cheque-form';
import BankTransferForm from './transaction-forms/bank-transfer-form';
import GatewayForm from './transaction-forms/gateway-form';
import { router } from 'expo-router';

interface PaymentMethodSelectorProps {
    balance: number;
}

function PaymentMethodSelector({ balance }: PaymentMethodSelectorProps) {
    const [selectedMethod, setSelectedMethod] = useState('');

    const paymentMethods = [
        { value: 'cash', label: 'Cash' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'bank', label: 'Bank Transfer' },
        { value: 'gateway', label: 'Payment Gateway' },
    ];

    const renderForm = () => {
        switch (selectedMethod) {
            case 'cash':
                return <CashForm />;
            case 'cheque':
                return <ChequeForm />;
            case 'bank':
                return <BankTransferForm />;
            case 'gateway':
                return <GatewayForm />;
            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>

                <Text 
                    variant="headlineMedium" 
                    style={{ flex: 1, textAlign: 'center' }}
                >
                    Balance: ₱{(balance || 0).toFixed(2)}
                </Text>
            </View>

            <View style={{ gap: 16, padding: 16 }}>
                <SegmentedButtons
                    value={selectedMethod}
                    onValueChange={setSelectedMethod}
                    buttons={paymentMethods}
                />

                {renderForm()}
            </View>
        </View>
    );
}

export default PaymentMethodSelector;
