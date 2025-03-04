import { ScrollView, View } from 'react-native';
import StepIndicator from '@/components/order-step-indicator';
import deliverySteps from './delivery-steps-label';
import AddDeliveryForm from '@/components/add-delivery-form';
import { router } from "expo-router";
import { Delivery } from '@/entities/delivery';
import { useDelivery } from '@/context/delivery-context';
import { useSuppliers } from '@/context/supplier-context';
import { useAuth } from '@/authentication/auth-context';

//react component
export default function AddDeliveryScreen() {

    const { user } = useAuth();
    const { suppliers } = useSuppliers();
    const { initializeDelivery } = useDelivery();

    function onSubmit(delivery: Delivery) {
        console.log('Delivery:', delivery);
        initializeDelivery(delivery);
        router.push('./add-delivery-items');
    }
    
    return (
        <View style={{ flex: 1 }}>            
            <StepIndicator currentStep={1} steps={deliverySteps}/>
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ 
                    paddingBottom: 100 // Add extra padding at bottom
                }}
                showsVerticalScrollIndicator={true}
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
            >
                <AddDeliveryForm suppliers={suppliers} onSubmit={onSubmit} currentUser={user || undefined}/>
            </ScrollView>
        </View>
    );
}