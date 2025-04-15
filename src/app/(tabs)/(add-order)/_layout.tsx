import { CartProvider } from '@/src/features/order-feature/context/cart-context';
import { OrderProvider } from '@/src/features/order-feature/context/order-context';
import { Stack } from 'expo-router';

export default function AddOrderLayout() {
    
    return (
        <OrderProvider>
            <CartProvider>
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

                    <Stack.Screen name="add-order"  options={{ title: "Add Order" }}/> 
                </Stack>
            </CartProvider>
        </OrderProvider>
    );
}