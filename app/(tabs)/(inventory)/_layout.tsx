import { Stack } from 'expo-router';

export default function InventoryLayout() {
    
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

            <Stack.Screen name="inventory"  options={{ title: "Inventory" }}/> 
        </Stack>
    );
}