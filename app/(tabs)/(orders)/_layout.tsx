import { Stack } from 'expo-router';

export default function OrdersLayout() {
    
    return (
        // Index layout
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

            <Stack.Screen name="orders"  options={{ title: "Orders" }}/> 
        </Stack>
    );
}
