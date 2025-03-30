import { Stack } from 'expo-router';

export default function AddOrderLayout() {
    
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

            <Stack.Screen name="add-order"  options={{ title: "Add Order" }}/> 
        </Stack>
    );
}