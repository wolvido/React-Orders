
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/style/theme';

import { AuthProvider } from '@/authentication/auth-context';

import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';
import { DeliveryProvider } from '@/context/delivery-context';
import { PurchaseOrderProvider } from '@/context/purchase-order-context';
import { ScrollView } from 'react-native';
import { ProductProvider } from '@/context/product-context';
import { ApiProvider } from '@/context/dev-mode-context';
import { SupplierProvider } from '@/context/supplier-context';

registerTranslation('en', enGB)
export default function RootLayout() {
    return (
        <ApiProvider>
            <AuthProvider>
                <ProductProvider>
                    <SupplierProvider>
                        <PaperProvider theme={theme}>
                            <PurchaseOrderProvider>
                                <OrderProvider>
                                    <DeliveryProvider>
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
                                                    
                                                </Stack>
                                        </CartProvider>
                                    </DeliveryProvider>
                                </OrderProvider>
                            </PurchaseOrderProvider>
                        </PaperProvider>
                    </SupplierProvider>
                </ProductProvider>
            </AuthProvider>
        </ApiProvider> 
    );
}
