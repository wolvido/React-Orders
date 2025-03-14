
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/shared/style/theme';

import { AuthProvider } from '@/features/authentication-feature/context/auth-context';

import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/features/order-feature/context/cart-context';
import { OrderProvider } from '@/features/order-feature/context/order-context';
import { DeliveryProvider } from '@/features/delivery-feature/context/delivery-context';
import { PurchaseOrderProvider } from '@/shared/context/purchase-order-context';
import { ScrollView } from 'react-native';
import { ProductProvider } from '@/shared/context/product-context';
import { ApiProvider } from '@/shared/context/dev-mode-context';
import { SupplierProvider } from '@/shared/context/supplier-context';

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
