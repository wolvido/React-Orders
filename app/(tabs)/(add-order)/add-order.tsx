import React from 'react';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/components/order-step-indicator';
import { View } from 'react-native';
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
        <View>
            <StepIndicator currentStep={1} steps={orderSteps} />
            <OrderDetailsForm onSubmit={handleOrderSubmit} />
        </View>
    );
}

