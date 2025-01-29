import CartContextProvider from '@/context/cart-context';
import { Stack } from 'expo-router';
import { Inventory } from '@/models/inventory';
import InventoryContextProvider from '@/context/inventory-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupplyOrderContextProvider, { SupplyOrderContext } from '@/context/supply-order-context';
import { PaperProvider } from 'react-native-paper';
import theme from '@/style/theme';

export default function RootLayout() {

    const StackNative = createNativeStackNavigator();

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
        <InventoryContextProvider initialDatabase={dummyInventoryDb}>
        <SupplyOrderContextProvider initialValue={{id: 0, supplier: "", supplyOrderItems: []}}>    
        <CartContextProvider initialValue={{ cartItems: [], cashier: "", id: 0, total: 0 }}>

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

        </CartContextProvider>
        </SupplyOrderContextProvider>
        </InventoryContextProvider>
        </PaperProvider>

    );
}
