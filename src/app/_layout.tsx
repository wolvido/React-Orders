
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/src/shared/style/theme';
import "@/src/shared/utils/date-extensions"; //this is extremely dangerous, and needs to be refactored

import { AuthProvider } from '@/src/features/authentication-feature/context/auth-context';

import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/src/features/order-feature/context/cart-context';
import { OrderProvider } from '@/src/features/order-feature/context/order-context';
import { DeliveryProvider } from '@/src/features/delivery-feature/context/delivery-context';
import { ProductProvider } from '@/src/services/product-service/context/product-context';
import { ApiProvider } from '@/src/services/dev-mode-service/context/dev-mode-context';
import { SupplierProvider } from '@/src/services/supplier-service/context/supplier-context';
import { PurchaseOrderProvider } from '@/src/features/purchase-order-feature/context/purchase-order-context';

registerTranslation('en', enGB)
export default function RootLayout() {
    return (
        <ApiProvider>
            <AuthProvider>
                <ProductProvider>
                    <SupplierProvider>
                        <PaperProvider theme={theme}>
                            <OrderProvider>
                                <PurchaseOrderProvider>
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
                                </PurchaseOrderProvider>
                            </OrderProvider>
                        </PaperProvider>
                    </SupplierProvider>
                </ProductProvider>
            </AuthProvider>
        </ApiProvider> 
    );
}
