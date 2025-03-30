
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import theme from '@/src/shared/lib/theme/theme';
import "@/src/shared/lib/date-time/date-extensions"; //this is an extremely dangerous import, and needs to be refactored
import { AuthProvider } from '@/src/features/auth-feature/context/auth-context';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import { CartProvider } from '@/src/features/order-feature/context/cart-context';
import { OrderProvider } from '@/src/features/order-feature/context/order-context';
import { DeliveryProvider } from '@/src/features/delivery-feature/context/delivery-context';
import { ProductProvider } from '@/src/entities/product/context-service/product-context';
import { ApiConfigProvider } from '@/src/shared/lib/api/api-config-context';
import { SupplierProvider } from '@/src/entities/supplier/context-service/supplier-context';
import { PurchaseOrderProvider } from '@/src/features/purchase-order-feature/context/purchase-order-context';

registerTranslation('en', enGB)
export default function RootLayout() {
    return (
        <ApiConfigProvider>
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
        </ApiConfigProvider> 
    );
}
