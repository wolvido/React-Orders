import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';

import OrdersScreen from '@/app/(tabs)/(orders)/orders';
import ProductsScreen from '@/app/(tabs)/(products)/products';
import AddDeliveryScreen from '@/app/(tabs)/(add-delivery)/add-delivery';
import AddOrderScreen from '@/app/(tabs)/(add-order)/add-order';
import PurchaseOrdersScreen from '@/app/(tabs)/(purchase-orders)/purchase-orders';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '@/style/theme';

const Tab = createBottomTabNavigator();

export default function TabLayout() {

    return (
        <Tab.Navigator
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

        <Tab.Screen
            name="orders"
            component={OrdersScreen}
            options={{
                title: 'Orders',
                tabBarLabel: 'Orders Screen',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="clipboard-list" size={size} color={color} />;
                },
            }}
        />

        <Tab.Screen
            name="products"
            component={ProductsScreen}
            options={{
                title: 'Products',
                tabBarLabel: 'Products Screen',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="package-variant" size={size} color={color} />;
                },
            }}
        />

        <Tab.Screen
            name="add-delivery"
            component={AddDeliveryScreen}
            options={{
                title: 'Add Delivery',
                tabBarLabel: 'Add Delivery',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="truck-delivery" size={size} color={color} />;
                },
            }}
        />

        <Tab.Screen
            name="add-order"
            component={AddOrderScreen}
            options={{
                title: 'Add Order',
                tabBarLabel: 'Add Order',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="cart-plus" size={size} color={color} />;
                },
            }}
        />

        <Tab.Screen
            name="purchase-orders"
            component={PurchaseOrdersScreen}
            options={{
                title: 'Purchase Orders',
                tabBarLabel: 'Purchase Orders',
                tabBarIcon: ({ color, size }) => {
                  return <MaterialCommunityIcons name="format-list-checkbox" size={size} color={color} />;
                },
            }}
        />




{/* 
            <Tab.Screen
                name="(add-delivery)"
                options={{
                    title: 'Add Delivery',
                    href: '/(tabs)/(add-delivery)/add-delivery',
                    headerStyle: {
                        backgroundColor: 'lightblue'
                    },
                }}
            />

            <Tab.Screen
                name="(add-order)"
                options={{
                    title: 'Add Order',
                    href: '/(tabs)/(add-order)/add-order',
                    headerStyle: {
                        backgroundColor: 'orange'
                    },
                }}
            />

            <Tab.Screen    
                name="(orders)"
                options={{
                    title: 'Orders',
                    href: '/(tabs)/(orders)/orders',
                    headerStyle: {
                        backgroundColor: 'lightpink'
                    },
                }}
            />

            <Tab.Screen
                name="(products)"
                options={{
                    title: 'Products',
                    href: '/(tabs)/(products)/products',
                    headerStyle: {
                        backgroundColor: 'lightyellow'
                    },
                }}
            />
            
            <Tab.Screen
                name="(purchase-orders)"
                options={{
                    title: 'Purchase Orders',
                    href: '/(tabs)/(purchase-orders)/purchase-orders',
                    headerStyle: {
                        backgroundColor: 'lightgreen'
                    },
                }}
            /> */}
        </Tab.Navigator>
    );
}
