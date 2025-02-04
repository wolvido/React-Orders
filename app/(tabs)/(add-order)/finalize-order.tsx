import { View, StyleSheet } from 'react-native';
import OrderForm from '@/components/finalize-order-form';
import StepIndicator from '@/components/order-step-indicator';
import orderSteps from './order-steps-label';
import OrderFormFinal from '@/components/finalize-order-form';
import { useOrder } from '@/context/order-context';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function FinalizeOrder() {
    const { getCurrentOrder, updateDeliveryAddress, updateRemarks, finalizeOrder} = useOrder();

    const handleFormChange = (formData: { remarks: string; deliveryAddress: string }) => {
        // Update delivery address
        updateDeliveryAddress(formData.deliveryAddress);
        // Update remarks
        updateRemarks(formData.remarks);
    };

    const handleFinalizeOrder = () => {
        finalizeOrder();
        router.push("/");
    }


    return (
        <View style={styles.container}>
            <StepIndicator currentStep={3} backPath='./add-items' steps={orderSteps}/>

            <View style={styles.content}>
                <OrderFormFinal onFormChange={handleFormChange} />
            </View>

            <Button mode="contained" onPress={handleFinalizeOrder}>
                Finalize Order
            </Button>

        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        backgroundColor: 'white',
        padding: 16,
        paddingTop: 24,
        paddingBottom: 24,
    },
    headerText: {
        fontWeight: '600',
        color: '#1a1a1a',
    },
    content: {
        padding: 16,
        gap: 16,
    }
});