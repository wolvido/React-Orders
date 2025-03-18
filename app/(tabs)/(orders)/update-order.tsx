import StepIndicator from "@/features/step-indicator-feature/components/order-step-indicator";
import { useOrder } from "@/features/order-feature/context/order-context";
import { Order } from "@/entities//order";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import orderUpdateSteps from "./update-order-labels";
import OrderDetailsForm from "@/features/order-feature/components/order-forms/add-order-details-form";
import { Customer } from "@/entities/customers";
import { CustomerRepository } from "@/repositories/customer-repository";
import { router } from "expo-router";
import { useAuth } from "@/features/authentication-feature/context/auth-context";
import { useProducts } from "@/services/product-service/context/product-context";


export default function UpdateOrderScreen(){
    const customerRepository = new CustomerRepository();

    const { getCurrentOrder } = useOrder();
    const [ order, setOrder ] = useState<Order | undefined>(undefined);
    const [ customers, setCustomers ] = useState<Customer[]>([]);
    const { applySchema, productSchemas } = useProducts();
    const { user } = useAuth();

    //set order to current order
    useEffect(() => {
        const currentOrder = getCurrentOrder();
        if (currentOrder) {
            setOrder(currentOrder);
        }
    }, [getCurrentOrder]);

    //load customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const data = await customerRepository.getAllCustomers();
                setCustomers(data);
            } catch (error) {
                console.error('Error loading customers:', error);
            }
        };

        loadCustomers();
    }, []);

    const handleOrderSubmit = (order: Order) => {
        console.log('Order submitted:', order);
        setOrder(order);
        router.push('/update-order-items');
    };

    return (
        <View>
            <StepIndicator currentStep={1} steps={orderUpdateSteps} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100 // Add extra padding at bottom
                }}
                showsVerticalScrollIndicator={true}
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
            >

            {order ? (
                <OrderDetailsForm
                    order={order}
                    customers={customers}
                    onSubmit={handleOrderSubmit}
                    currentUser={user || undefined}
                    schemas={productSchemas}
                    onSchemaSelect={applySchema}
                />
            ) : (
                <ActivityIndicator size="large" />
            )}

            </ScrollView>
            
        </View>
    );





}