import { Stack } from 'expo-router';

export default function HomeLayout() {
    
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

            <Stack.Screen name="index"  options={{ title: "Index" }}/> 
        </Stack>
    );
}
