import React from 'react';
import { CommonActions, DefaultTheme} from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '@/style/theme';
import { Tabs } from 'expo-router';


export default function TabLayout() {

    return (
        
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.primary, // Header background color
                },
                headerTintColor: 'white', // Header text/icons color
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerShadowVisible: true,
            }}


            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}

                    style={{
                        backgroundColor: theme.colors.primary,
                        
                    }}  

                    activeColor = 'white'
                    inactiveColor='white'

                    activeIndicatorStyle={{
                        backgroundColor: theme.colors.background,
                    }}

                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                    
                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}

                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            // Invert the color for icons - when tab is active use yellow, when inactive use white
                            const iconColor = focused ? theme.colors.primary : "white";
                            return options.tabBarIcon({ focused, color: iconColor, size: 24 });
                        }
                        return null;
                    }}

                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            typeof options.tabBarLabel === 'string'
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;
                        return label;
                    }}
                />
            )}
        >

        <Tabs.Screen
            name="(orders)"
            options={{
                title: 'Orders',
                tabBarLabel: 'Orders Screen',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="clipboard-list" size={size} color={color} />;
                },
            }}
        />

        <Tabs.Screen
            name="(products)"
            options={{
                title: 'Products',
                tabBarLabel: 'Products Screen',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="package-variant" size={size} color={color} />;
                },
            }}
        />

        <Tabs.Screen
            name="(add-delivery)"
            options={{
                title: 'Add Delivery',
                tabBarLabel: 'Add Delivery',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="truck-delivery" size={size} color={color} />;
                },
            }}
        />

        <Tabs.Screen
            name="(add-order)"
            options={{
                title: 'Add Order',
                tabBarLabel: 'Add Order',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="cart-plus" size={size} color={color} />;
                },
            }}
        />

        <Tabs.Screen
            name="(purchase-orders)"
            options={{
                title: 'Purchase Orders',
                tabBarLabel: 'Purchase Orders',
                href : "/(tabs)/(purchase-orders)/purchase-orders",
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="format-list-checkbox" size={size} color={color} />;
                },
            }}
        />{

        }
        </Tabs>

        
    );
}
