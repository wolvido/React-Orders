import { Stack } from 'expo-router';

export default function AddDeliveryLayout() {
    
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

            <Stack.Screen name="add-delivery"  options={{ title: "Add Delivery" }}/> 
        </Stack>
    );
}