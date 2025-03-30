import React, { useState } from 'react';
import { CommonActions, DefaultTheme} from '@react-navigation/native';
import { Text, BottomNavigation, IconButton, Drawer } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '@/src/shared/lib/theme/theme';
import { Redirect, Tabs } from 'expo-router';

import { useAuth } from '@/src/features/auth-feature/context/auth-context';
import useOrientation from '@/src/shared/lib/device/orientation-hook';
import { View, StyleSheet, Animated, Pressable, } from 'react-native';
import { LandscapeDrawer } from '@/src/shared/ui/landscape-drawer';

export default function TabLayout() {
    const orientation = useOrientation();
    const { logout, isAuthenticated, isLoading } = useAuth();
    const [drawerVisible, setDrawerVisible] = useState(false);
    
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!isAuthenticated) {
        return <Redirect href="/authentication" />;
    }

    const navigationItems = [
        {
            name: '(orders)',
            label: 'Orders',
            icon: 'clipboard-list' as const,
        },
        {
            name: '(products)',
            label: 'Products',
            icon: 'package-variant' as const,
        },
        {
            name: '(add-delivery)',
            label: 'Add Delivery',
            icon: 'truck-delivery' as const,
        },
        {
            name: '(add-order)',
            label: 'Add Order',
            icon: 'cart-plus' as const,
        },
        {
            name: '(purchase-orders)',
            label: 'Purchase Orders',
            icon: 'format-list-checkbox' as const,
        },
    ];

    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerShadowVisible: true,
                headerLeft: orientation === 'LANDSCAPE' ? () => (
                    <IconButton
                        icon={drawerVisible ? "menu-open" : "menu"}
                        iconColor="white"
                        size={24}
                        onPress={() => setDrawerVisible(!drawerVisible)}
                    />
                ) : undefined,
                headerRight: () => (
                    <IconButton
                        icon="logout"
                        iconColor="white"
                        size={24}
                        onPress={logout}
                    />
                ),
            }}

        tabBar={({ navigation, state, descriptors, insets }) => {
            if (orientation === 'LANDSCAPE') {
                return (
                    <>
                        {drawerVisible && (
                            <Pressable 
                                style={styles.overlay}
                                onPress={() => setDrawerVisible(false)}
                            />
                        )}
                        <LandscapeDrawer
                            visible={drawerVisible}
                            navigationItems={navigationItems}
                            currentRoute={state.routes[state.index].name}
                            onNavigate={(name) => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: name,
                                    canPreventDefault: true,
                                });
            
                                if (!event.defaultPrevented) {
                                    navigation.dispatch({
                                        ...CommonActions.navigate(name),
                                        target: state.key,
                                    });
                                    setDrawerVisible(false); // Close drawer after navigation
                                }
                            }}
                            onLogout={logout}
                        />
                    </>
                );
            }

                return (
                    <BottomNavigation.Bar
                        navigationState={state}
                        safeAreaInsets={insets}
                        style={{
                            backgroundColor: theme.colors.primary,
                        }}
                        activeColor="white"
                        inactiveColor="white"
                        activeIndicatorStyle={{
                            backgroundColor: theme.colors.background,
                        }}
                        onTabPress={({ route, preventDefault }) => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            // in case we need to prevent navigation for some reason
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
                                const iconColor = focused ? theme.colors.primary : "white";
                                return options.tabBarIcon({ focused, color: iconColor, size: 24 });
                            }
                            return null;
                        }}
                        getLabelText={({ route }) => {
                            const { options } = descriptors[route.key];
                            return typeof options.tabBarLabel === 'string'
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;
                        }}
                    />
                );
            }}
        >
            {navigationItems.map((item) => (
                <Tabs.Screen
                    key={item.name}
                    name={item.name}
                    options={{
                        title: item.label,
                        tabBarLabel: item.label,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons 
                                name={item.icon} 
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        width: 250,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        left: 0,
        top: 64, // Height of your header
        bottom: 0,
        zIndex: 1,
    },
    drawer: {
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        marginLeft: 0,
    },    
    overlay: {
        position: 'absolute',
        top: 64, 
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 0, 
    },
});