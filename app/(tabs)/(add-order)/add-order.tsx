import React from 'react';
import { useForm } from 'react-hook-form';
import OrderDetailsForm from '@/components/add-order-details-form';
import StepIndicator from '@/components/order-step-indicator';
import { View } from 'react-native';
import orderSteps from './order-steps-label';

//react component
export default function AddOrderScreen() {
    return (

        <View>
            <StepIndicator currentStep={1} backPath='../' steps={orderSteps} />
            <OrderDetailsForm redirectTo="../add-items" />
        </View>

    );
}

