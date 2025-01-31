
import { Stack } from 'expo-router';
import { Inventory } from '@/models/inventory';
import { PaperProvider } from 'react-native-paper';
import theme from '@/style/theme';
import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/context/cart-context';
// Register the translations you need
registerTranslation('en', enGB)

    
export default function RootLayout() {


    //dummy inventory database
    const item1 = {id: 1, name: 'Heinz Ketchup', description: "ketchup tomato", price: 10}
    const item2 = {id: 2, name: 'Parsely Dried', description: "spices something something", price: 5}
    const item3 = {id: 3, name: 'Item 3', description: "description3", price: 15}
    const dummyInventoryDb: Inventory[] = [
        {id: 1, item: item1, quantity: 10},
        {id: 2, item: item2, quantity: 20},
        {id: 3, item: item3, quantity: 30},
    ];

    return (
        <PaperProvider theme={theme}>
            <CartProvider>
                <Stack
                    screenOptions={{
                    headerStyle: {
                        backgroundColor: 'green'
                    },
                    headerTintColor: '#fff',
                    headerShown: false,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    }}>
                    {/* <Stack.Screen name="(home)" options={{ title: "Home" }}/> */}
                </Stack>
                
            </CartProvider>

        </PaperProvider>

    );
}
