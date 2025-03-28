
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/shared/style/theme';
import "@/shared/utils/date-extensions";

import { AuthProvider } from '@/features/authentication-feature/context/auth-context';

import {enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/features/order-feature/context/cart-context';
import { OrderProvider } from '@/features/order-feature/context/order-context';
import { DeliveryProvider } from '@/features/delivery-feature/context/delivery-context';
import { ScrollView } from 'react-native';
import { ProductProvider } from '@/services/product-service/context/product-context';
import { ApiProvider } from '@/services/dev-mode-service/context/dev-mode-context';
import { SupplierProvider } from '@/services/supplier-service/context/supplier-context';
import { PurchaseOrderProvider } from '@/features/purchase-order-feature/context/purchase-order-context';

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
