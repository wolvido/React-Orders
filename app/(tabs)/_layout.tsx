
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    //tab bar below and above
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}> 
        <Tabs.Screen
            name="(home)"
            options={{
                title: 'Home',
                href: '/(tabs)/(home)',
                headerStyle: {
                backgroundColor: 'lightblue'
            },
            }}
        />

        <Tabs.Screen
            name="(inventory)"
            options={{
                title: 'Inventory',
                href: "/(tabs)/(inventory)/inventory",
                headerStyle: { 
                    backgroundColor: 'orange'
                    },
        }}
        />

        <Tabs.Screen    
            name="(order)"
            options={{
                title: 'Order',
                href: "/(tabs)/(order)/order",
                headerStyle: { 
                    backgroundColor: 'lightpink'
                    },
        }}
        />

        <Tabs.Screen
            name="(supply-order)"
            options={{
                title: 'Supply Order',
                href: "/(tabs)/(supply-order)/supply-order",
                headerStyle: { 
                    backgroundColor: 'lightyellow'
                    },
        }}
        />

    </Tabs>
  );
}
