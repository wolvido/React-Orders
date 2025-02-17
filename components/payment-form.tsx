import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import CashForm from './transaction-forms/cash-form';
import ChequeForm from './transaction-forms/cheque-form';
import BankTransferForm from './transaction-forms/bank-transfer-form';
import GatewayForm from './transaction-forms/gateway-form';
import PaymentMethod from '@/entities/payment-method';
import { Order } from '@/entities/order';

interface PaymentMethodSelectorProps {
    orderId: number;
    onPaymentSubmit: (paymentMethod: PaymentMethod) => void;
    getOrderById: (id: number) => Order;
}

function PaymentMethodSelector({ orderId, onPaymentSubmit, getOrderById  }: PaymentMethodSelectorProps) {

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const orderData = getOrderById(orderId);
        setOrder(orderData);
    }, [orderId, getOrderById]);

    const [selectedMethod, setSelectedMethod] = useState('cash');

    const paymentMethods = [
        { value: 'cash', label: 'Cash' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'bank', label: 'Bank Transfer' },   
        { value: 'gateway', label: 'Payment Gateway'  },
    ];

    const handleBankTransferSubmit = (data: Extract<PaymentMethod, { type: "Bank Transfer" }>) => {

        const paymentMethod: PaymentMethod = {
            type: "Bank Transfer",
            payment: data.payment,
            bankName: data.bankName,
            id: data.id,
            depositDate: data.depositDate,
            orderId: orderId,
            balance: data.payment
        };
        
        onPaymentSubmit(paymentMethod);
    };

    const handleGatewaySubmit = (data: Extract<PaymentMethod, { type: "Payment gateway" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Payment gateway",
            paymentProvider: data.paymentProvider,
            id: data.id,
            payment: data.payment,
            orderId: orderId,
            balance: data.payment
        };

        onPaymentSubmit(paymentMethod);
    };

    const handleChequeSubmit = (data: Extract<PaymentMethod, { type: "Cheque" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Cheque",
            chequeNumber: data.chequeNumber,
            bankName: data.bankName,
            payment: data.payment,
            remark: data.remark,
            chequeDate: data.chequeDate,
            orderId: orderId,
            balance: data.payment,
            id: data.id
        };

        onPaymentSubmit(paymentMethod);
    };

    const handleCashSubmit = (data: Extract<PaymentMethod, { type: "Cash" }>) => {
        const paymentMethod: PaymentMethod = {
            type: "Cash",
            id: data.id,
            cashTendered: data.cashTendered,
            changeDue: data.changeDue,
            orderId: orderId,
            balance: data.cashTendered - data.changeDue
        };

        onPaymentSubmit(paymentMethod);
    };

    const renderForm = () => {
        switch (selectedMethod) {
            case 'cash':
                return <CashForm orderBalance={order?.balance || 0} amount={order?.total || 0} orderId={order?.id || 0} onSubmit={handleCashSubmit} />;
            case 'cheque':
                return <ChequeForm orderBalance={order?.balance || 0} orderId={order?.id || 0} onSubmit={handleChequeSubmit} />;
            case 'bank':
                return <BankTransferForm orderBalance={order?.balance || 0} orderId={order?.id || 0} onSubmit={handleBankTransferSubmit} />;
            case 'gateway':
                return <GatewayForm orderBalance={order?.balance || 0} orderId={order?.id || 0}  onSubmit={handleGatewaySubmit} />;
            default:
                return null;
        }
    };

    return (
        <View>
            <View style={{ padding: 16 }}>
                {/* Order Details Card */}
                <View style={{ marginBottom: 24 }}>
                    <Text variant="titleLarge" style={{ marginBottom: 10 }}>Order Details</Text>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 16,
                        elevation: 2,
                        gap: 6,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text variant="labelLarge" style={{ color: '#666' }}>Customer</Text>
                            <Text variant="bodyLarge">{order?.customer?.name || 'N/A'}</Text>
                        </View>
    
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text variant="labelLarge" style={{ color: '#666' }}>Reference No</Text>
                            <Text variant="bodyLarge">{order?.referenceNo || 'N/A'}</Text>
                        </View>
    
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text variant="labelLarge" style={{ color: '#666' }}>Date</Text>
                            <Text variant="bodyLarge">
                                {order?.transactionDate 
                                    ? new Date(order.transactionDate).toLocaleDateString() 
                                    : 'N/A'}
                            </Text>
                        </View>
    
                        <View style={{ 
                            marginTop: 8,
                            paddingTop: 10,
                            borderTopWidth: 1,
                            borderTopColor: '#eee',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text variant="titleMedium" style={{ color: '#666' }}>Balance Due</Text>
                            <Text variant="headlineSmall" style={{ color: '#2196F3' }}>
                                ₱{(order?.balance || 0).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
    
                <View style={{ gap: 16 }}>
                    <SegmentedButtons
                        value={selectedMethod}
                        onValueChange={setSelectedMethod}
                        buttons={paymentMethods}
                    />
                    {renderForm()}
                </View>
            </View>
        </View>
    );
    
}

export default PaymentMethodSelector;

