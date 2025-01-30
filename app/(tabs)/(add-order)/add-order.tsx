import React from 'react';
import { useForm } from 'react-hook-form';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/context/order-step-indicator';
import { View } from 'react-native';
import { Link } from 'expo-router';

//react component
export default function AddOrderScreen() {
    return (
        <View>
            <StepIndicator currentStep={1} />
            <OrderDetailsForm/>
            <Link href="/(tabs)/(add-order)/add-items">add items</Link>
        </View>

    );
  }