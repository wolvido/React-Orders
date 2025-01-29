import { Stack } from 'expo-router';

export default function OrdersLayout() {
    
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

            <Stack.Screen name="orders"  options={{ title: "Orders" }}/> 
        </Stack>
    );
}
