import { Stack } from 'expo-router';

export default function PurchaseOrders() {
    
    return (
        
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

            <Stack.Screen name="purchase-orders"  options={{ title: "Purchase Orders" }}/> 
        </Stack>
    );
}