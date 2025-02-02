import { DeliveryProvider } from '@/context/delivery-cart-context';
import { Stack } from 'expo-router';

export default function AddDeliveryLayout() {
    
    return (
        <DeliveryProvider>
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
        </DeliveryProvider>
    );
}