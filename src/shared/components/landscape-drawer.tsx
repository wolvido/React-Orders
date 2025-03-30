import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '@/src/shared/style/theme';

type NavigationItem = {
    name: string;
    label: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface LandscapeDrawerProps {
    visible: boolean;
    navigationItems: NavigationItem[];
    currentRoute: string;
    onNavigate: (name: string) => void;
    onLogout: () => void;
}

export function LandscapeDrawer({
    visible,
    navigationItems,
    currentRoute,
    onNavigate,
    onLogout
}: LandscapeDrawerProps) {
    return (
        <Animated.View style={[
            styles.drawerContainer,
            {
                transform: [{
                    translateX: visible ? 0 : -250,
                }],
            }
        ]}>
            <Drawer.Section style={styles.drawer}>
                {navigationItems.map((item) => (
                    <Drawer.Item
                        key={item.name}
                        icon={({ size }) => (
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={size}
                                color={currentRoute === item.name ? theme.colors.primary : "white"}
                            />
                        )}
                        label={item.label}
                        active={currentRoute === item.name}
                        theme={{
                            colors: {
                                onSurfaceVariant: 'white',
                                onSecondaryContainer: theme.colors.primary,
                                secondaryContainer: theme.colors.background,
                            }
                        }}
                        onPress={() => onNavigate(item.name)}
                    />
                ))}
                <Drawer.Item
                    icon={({ size }) => (
                        <MaterialCommunityIcons
                            name="logout"
                            size={size}
                            color="white"
                        />
                    )}
                    label="Logout"
                    theme={{
                        colors: {
                            onSurfaceVariant: 'white',
                        }
                    }}
                    onPress={onLogout}
                />
            </Drawer.Section>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        width: 250,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        left: 0,
        top: 64,
        bottom: 0,
        zIndex: 1,
    },
    drawer: {
        backgroundColor: 'transparent',
    },
});
