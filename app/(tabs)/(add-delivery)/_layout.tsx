import { DeliveryCartProvider } from '@/context/delivery-cart-context';
import { Stack } from 'expo-router';

export default function AddDeliveryLayout() {
    
    return (
        <DeliveryCartProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        // backgroundColor: 'blue',
                    },
                    headerShown: false,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>

                <Stack.Screen name="add-delivery"  options={{ title: "Add Delivery" }}/> 
            </Stack>
        </DeliveryCartProvider>
    );
}