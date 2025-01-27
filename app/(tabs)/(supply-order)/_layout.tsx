import { Stack } from 'expo-router';

export default function SupplyOrderLayout() {
    
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

            <Stack.Screen name="supply-order"  options={{ title: "Supply Order" }}/> 
        </Stack>
    );
}