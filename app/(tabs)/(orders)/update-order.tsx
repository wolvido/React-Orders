import StepIndicator from "@/components/order-step-indicator";
import { useOrder } from "@/context/order-context";
import { Order } from "@/entities/order";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import orderUpdateSteps from "./update-order-labels";
import OrderDetailsForm from "@/components/add-order-details-form";
import { Customer } from "@/entities/customers";
import { CustomerRepository } from "@/repositories/customer-repository";
import { router } from "expo-router";


export default function UpdateOrderScreen(){
    const customerRepository = new CustomerRepository();

    const { getCurrentOrder } = useOrder();
    const [ order, setOrder ] = useState<Order | undefined>(undefined);
    const [ customers, setCustomers ] = useState<Customer[]>([]);

    useEffect(() => {
        const currentOrder = getCurrentOrder();
        if (currentOrder) {
            console.log('Loading order into update form:', currentOrder);
            setOrder(currentOrder);
        }
    }, [getCurrentOrder]);

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
            {order ? (
                <OrderDetailsForm 
                    order={order}
                    customers={customers} 
                    onSubmit={handleOrderSubmit}
                />
            ) : (
                <ActivityIndicator size="large" />
            )}
        </View>
    );





}