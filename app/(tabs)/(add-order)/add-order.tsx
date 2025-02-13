import React, { useEffect, useState } from 'react';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/components/order-step-indicator';
import { ScrollView, View } from 'react-native';
import orderSteps from './order-steps-label';
import { Order } from '@/entities/order';
import { router } from 'expo-router';
import { useOrder } from '@/context/order-context';
import { Customer } from '@/entities/customers';

//react component
export default function AddOrderScreen() {

    const { initializeOrder, getAllCustomers } = useOrder();
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        getAllCustomers().then((data) => {
            setCustomers(data);
        });
        console.log(customers);
    }, []);

    const handleOrderSubmit = (order: Order) => {
        console.log('Order submitted:', order);
        initializeOrder(order);
        router.push('/add-items');
    };

    return (
        <View style={{ flex: 1 }}>
            <StepIndicator currentStep={1} steps={orderSteps} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100 // Add extra padding at bottom
                }}
                showsVerticalScrollIndicator={true}
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
            >
                <OrderDetailsForm onSubmit={handleOrderSubmit} customers={customers} />
            </ScrollView>
        </View>
    );
}

