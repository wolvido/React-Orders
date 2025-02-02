import { View } from 'react-native';
import StepIndicator from '@/components/order-step-indicator';
import deliverySteps from './delivery-steps-label';
import AddDeliveryForm from '@/components/add-delivery-form';
import { dummySuppliers } from '@/dummy-data/dummy-suppliers';
import { router } from "expo-router";

//react component
export default function AddDeliveryScreen() {

    function onSubmit(delivery: any) {
        router.push('./add-delivery-items');
    }

    return (
        <View>            
            <StepIndicator currentStep={1} backPath='../' steps={deliverySteps}/>
            
            <AddDeliveryForm suppliers={dummySuppliers} onSubmit={onSubmit}/>
        </View>
    );
}