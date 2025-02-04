import React, { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Text, Button } from 'react-native-paper';
import CashForm from './transaction-forms/cash-form';
import ChequeForm from './transaction-forms/cheque-form';
import BankTransferForm from './transaction-forms/bank-transfer-form';
import GatewayForm from './transaction-forms/gateway-form';
import { BankTransferPayment } from '@/entities/payment-method';
import PaymentMethod from '@/entities/payment-method';

interface PaymentMethodSelectorProps {
    balance: number;
    orderId: number;
}

function PaymentMethodSelector({ balance, orderId }: PaymentMethodSelectorProps) {
    const [selectedMethod, setSelectedMethod] = useState('cash');

    console.log('id', orderId);

    const paymentMethods = [
        { value: 'cash', label: 'Cash' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'bank', label: 'Bank Transfer' },
        { value: 'gateway', label: 'Payment Gateway' },
    ];

    const handleBankTransferSubmit = (data: Extract<PaymentMethod, { type: "Bank Transfer" }>) => {

        //how to create a PaymentMethod object
        const paymentMethod: PaymentMethod = {
            type: "Bank Transfer",
            amount: data.amount,
            bankName: data.bankName,
            id: data.id,
            depositDate: data.depositDate
        };

        console.log('Payment Request to be sent:', paymentMethod);
    };

    const handleGatewaySubmit = (data: Extract<PaymentMethod, { type: "Payment gateway" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Payment gateway",
            paymentProvider: data.paymentProvider,
            id: data.id,
            transactionFee: data.transactionFee
        };

        console.log('Payment Request to be sent:', paymentMethod);
    };

    const handleChequeSubmit = (data: Extract<PaymentMethod, { type: "Cheque" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Cheque",
            chequeNumber: data.chequeNumber,
            bankName: data.bankName,
            amount: data.amount,
            remark: data.remark,
            chequeDate: data.chequeDate
        };

        console.log('Payment Request to be sent:', paymentMethod);
    };

    const handleCashSubmit = (data: Extract<PaymentMethod, { type: "Cash" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Cash",
            id: data.id,
            amountDue: data.amountDue,
            cashTendered: data.cashTendered,
            changeDue: data.changeDue
        };

        console.log('Payment Request to be sent:', paymentMethod);
    };

    const renderForm = () => {
        switch (selectedMethod) {
            case 'cash':
                return <CashForm onSubmit={handleCashSubmit} />;
            case 'cheque':
                return <ChequeForm onSubmit={handleChequeSubmit} />;
            case 'bank':
                return <BankTransferForm onSubmit={handleBankTransferSubmit} />;
            case 'gateway':
                return <GatewayForm onSubmit={handleGatewaySubmit} />;
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
