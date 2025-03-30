import { Stack } from 'expo-router';

export default function ProductsLayout() {
    
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

            <Stack.Screen name="products"  options={{ title: "Products" }}/> 
        </Stack>
    );
}