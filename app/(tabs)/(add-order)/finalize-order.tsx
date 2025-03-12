import { View, StyleSheet, ScrollView } from 'react-native';
import OrderForm from '@/features/order-feature/components/order-forms/finalize-order-form';
import StepIndicator from '@/features/step-indicator-feature/components/order-step-indicator';
import orderSteps from './order-steps-label';
import OrderFormFinal from '@/features/order-feature/components/order-forms/finalize-order-form';
import { useOrder } from '@/features/order-feature/context/order-context';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useProducts } from '@/shared/context/product-context';
import { useCart } from '@/features/order-feature/context/cart-context';
import { useState } from 'react';

export default function FinalizeOrder() {
    const { updateDeliveryAddress, updateRemarks, finalizeOrder} = useOrder();
    const { refreshProducts } = useProducts();
    const { emptyCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormChange = (formData: { remarks: string; deliveryAddress: string }) => {
        // Update delivery address
        updateDeliveryAddress(formData.deliveryAddress);
        // Update remarks
        updateRemarks(formData.remarks);
    };

    const handleFinalizeOrder = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            await finalizeOrder();
            await refreshProducts();
            emptyCart();
            router.push('/add-order');
            router.push('/orders');
        } catch (error) {
            // Handle error if needed
            console.error('Error finalizing order:', error);
            setIsSubmitting(false); // Re-enable button on error
        }
    }
    
    return (
        <View style={styles.container}>
            <StepIndicator currentStep={3} backPath='./add-items' steps={orderSteps}/>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingBottom: 100 // Add extra padding at bottom
                    }}
                    showsVerticalScrollIndicator={true}
                    keyboardDismissMode="interactive"
                    automaticallyAdjustKeyboardInsets={true}
                >

                    <View style={styles.content}>
                        <OrderFormFinal onFormChange={handleFormChange} />
                    </View>

                    <Button
                        mode="contained" 
                        onPress={handleFinalizeOrder}
                        disabled={isSubmitting} // Disable button while submitting
                        loading={isSubmitting} // Show loading indicator while submitting
                    >
                        {isSubmitting ? 'Finalizing Order...' : 'Finalize Order'}
                    </Button>
                </ScrollView>
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