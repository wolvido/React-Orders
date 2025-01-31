import React from 'react';
import { useForm } from 'react-hook-form';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/components/order-step-indicator';
import { View } from 'react-native';

//react component
export default function AddOrderScreen() {
    return (
        <View>
            <StepIndicator currentStep={1} />
            <OrderDetailsForm redirectTo="../add-items" />
        </View>

    );
  }