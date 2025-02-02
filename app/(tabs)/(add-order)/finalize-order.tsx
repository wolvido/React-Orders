import { View, StyleSheet } from 'react-native';
import OrderForm from '@/components/finalize-order-form';
import StepIndicator from '@/components/order-step-indicator';

export default function FinalizeOrder() {

    const handleFormChange = (formData: { remarks: string; deliveryAddress: string }) => {
        // Update your order state here
        setOrder(prev => ({
            ...prev,
            remarks: formData.remarks,
            deliveryAddress: formData.deliveryAddress
        }));
    };


    return (
        <View style={styles.container}>
            <StepIndicator currentStep={3} backPath='./add-items'/>

            <View style={styles.content}>
                
                <OrderForm onFormChange={handleFormChange} />
            </View>
        </View>
    );

}

//temp, function not implemented yet
function setOrder(arg0: (prev: any) => any) {
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