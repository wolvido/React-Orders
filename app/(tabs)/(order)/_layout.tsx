import { Stack } from 'expo-router';

export default function OrderLayout() {
    
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

            <Stack.Screen name="order"  options={{ title: "Order" }}/> 
        </Stack>
    );
}