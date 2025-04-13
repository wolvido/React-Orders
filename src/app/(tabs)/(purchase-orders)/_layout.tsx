import { PurchaseOrderLineProvider } from '@/src/entities/purchase-order-line/context-service/purchase-order-line-context';
import { DeliveryCartProvider } from '@/src/features/delivery-feature/context/delivery-cart-context';
import { PurchaseOrderListingProvider } from '@/src/features/purchase-order-feature/context/purchase-order-listing-context';
import { Stack } from 'expo-router';

export default function PurchaseOrdersLayout() {
    
    return (
        <PurchaseOrderLineProvider>
            <PurchaseOrderListingProvider>
                <DeliveryCartProvider>
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

                        <Stack.Screen name="purchase-orders"  options={{ title: "Purchase Orders" }}/>
                    </Stack>
                </DeliveryCartProvider>
            </PurchaseOrderListingProvider>
        </PurchaseOrderLineProvider>
    );
}