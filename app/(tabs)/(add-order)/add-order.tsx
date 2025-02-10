import React from 'react';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/components/order-step-indicator';
import { ScrollView, View } from 'react-native';
import orderSteps from './order-steps-label';
import { Order } from '@/entities/order';
import { router } from 'expo-router';
import { useOrder } from '@/context/order-context';
import { Button } from 'react-native-paper';

//react component
export default function AddOrderScreen() {

    const { initializeOrder } = useOrder();

    const handleOrderSubmit = (order: Order) => {
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
                <OrderDetailsForm onSubmit={handleOrderSubmit} />
            </ScrollView>
        </View>
    );
}

