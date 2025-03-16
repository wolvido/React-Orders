import React, { useEffect, useState } from 'react';
import OrderDetailsForm from '@/features/order-feature/components/order-forms/add-order-details-form';
import StepIndicator from '@/features/step-indicator-feature/components/order-step-indicator';
import { ScrollView, View } from 'react-native';
import orderSteps from './order-steps-label';
import { Order } from '@/features/order-feature/types/order';
import { router } from 'expo-router';
import { useOrder } from '@/features/order-feature/context/order-context';
import { Customer } from '@/shared/entities/customers';
import { CustomerRepository } from '@/repositories/customer-repository';
import { useAuth } from '@/features/authentication-feature/context/auth-context';
import { useProducts } from '@/shared/context/product-context';
import { ProductSchema } from '@/shared/entities/product-schema';

//react component
export default function AddOrderScreen() {

    const customerRepository = new CustomerRepository();
    const { user } = useAuth();
    const { initializeOrder, getCurrentOrder } = useOrder();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { applySchema, productSchemas } = useProducts();

    useEffect(() => {
        customerRepository.getAllCustomers().then((customers) => {
            setCustomers(customers);
        });
    }, []);

    const handleOrderSubmit = (order: Order) => {
        console.log('Order submitted:', order);
        initializeOrder(order);
        router.push('/add-items');
    };

    //default product pricing schema
    const defaultSchema: ProductSchema = {
        id: 0,
        description: 'Default Pricing Schema',
        type: '',
        selectionType: 'Default',
        modifyingValue: 0
    }
    
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

            <OrderDetailsForm
                currentUser={user || undefined} 
                onSubmit={handleOrderSubmit} 
                customers={customers} 
                schemas={productSchemas}
                onSchemaSelect={applySchema}
                order={getCurrentOrder() || undefined}
                defaultSchema={defaultSchema}
            />

            </ScrollView>
        </View>
    );
}

