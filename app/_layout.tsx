
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/style/theme';

import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';

registerTranslation('en', enGB)
export default function RootLayout() {

    return (
        <PaperProvider theme={theme}>
            <OrderProvider>
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
            </OrderProvider>

        </PaperProvider>

        // <View>
        //     <Text>Root Layout</Text>
        // </View>

    );
}
