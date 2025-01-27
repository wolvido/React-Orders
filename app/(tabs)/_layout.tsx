
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    //tab bar below and above
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        
        <Tabs.Screen
            name="(add-delivery)"
            options={{
                title: 'Add Delivery',
                href: '/(tabs)/(add-delivery)/add-delivery',
                headerStyle: {
                backgroundColor: 'lightblue'
            },
            }}
        />

        <Tabs.Screen
            name="(add-order)"
            options={{
                title: 'Add Order',
                href: "/(tabs)/(add-order)/add-order",
                headerStyle: { 
                    backgroundColor: 'orange'
                    },
        }}
        />

        <Tabs.Screen    
            name="(orders)"
            options={{
                title: 'Orders',
                href: "/(tabs)/(orders)/orders",
                headerStyle: { 
                    backgroundColor: 'lightpink'
                    },
        }}
        />

        <Tabs.Screen
            name="(products)"
            options={{
                title: 'Products',
                href: "/(tabs)/(products)/products",
                headerStyle: { 
                    backgroundColor: 'lightyellow'
                    },
        }}
        />

        <Tabs.Screen
            name="(purchase-orders)"
            options={{
                title: 'Purchase Orders',
                href: "/(tabs)/(purchase-orders)/purchase-orders",
                headerStyle: { 
                    backgroundColor: 'lightgreen'
                    },
        }}
        />

    </Tabs>
  );
}
