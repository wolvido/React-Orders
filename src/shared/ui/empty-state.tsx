import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, ActivityIndicator } from 'react-native-paper';
import theme from '@/src/shared/lib/theme/theme';

interface EmptyStateProps {
    title: string;
    subtitle: string;
    loading?: boolean;
}

export function EmptyState({
    title,
    subtitle,
    loading = false
}: EmptyStateProps) {
    return (
        <Surface style={styles.emptyContainer} elevation={0}>
            {loading ? (
                <>
                    <ActivityIndicator 
                        size="large" 
                        color={theme.colors.primary} 
                        style={styles.spinner} 
                    />
                    <Text variant="headlineSmall" style={styles.emptyText}>
                        {title}
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtext}>
                        {subtitle}
                    </Text>
                </>
            ) : (
                <>
                    <Text variant="headlineSmall" style={styles.emptyText}>
                        {title}
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtext}>
                        {subtitle}
                    </Text>
                </>
            )}
        </Surface>
    );
    
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    emptyText: {
        color: theme.colors.primary,
        textAlign: 'center',
    },
    emptySubtext: {
        marginTop: 8,
        color: theme.colors.secondary,
        textAlign: 'center',
        opacity: 0.8,
    },
    spinner: {
        marginBottom: 24, // Adjust this value to fine-tune vertical spacing
    },
});

