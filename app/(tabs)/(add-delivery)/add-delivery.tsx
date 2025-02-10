import { ScrollView, View } from 'react-native';
import StepIndicator from '@/components/order-step-indicator';
import deliverySteps from './delivery-steps-label';
import AddDeliveryForm from '@/components/add-delivery-form';
import { dummySuppliers } from '@/dummy-data/dummy-suppliers';
import { router } from "expo-router";
import { Delivery } from '@/entities/delivery';
import { useDelivery } from '@/context/delivery-context';

//react component
export default function AddDeliveryScreen() {

    const { initializeDelivery } = useDelivery();

    function onSubmit(delivery: Delivery) {
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
                <AddDeliveryForm suppliers={dummySuppliers} onSubmit={onSubmit}/>
            </ScrollView>
        </View>
    );
}