import { PurchaseOrder } from '@/src/entities/purchase-order/type/purchase-order';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';


interface PurchaseOrderDetailsProps {
    purchaseOrder: PurchaseOrder;
}

export const PurchaseOrderDetails = ({ purchaseOrder }: PurchaseOrderDetailsProps) => {
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <View style={styles.detailItem}>
                    <Text variant="labelLarge" style={styles.label}>
                        Purchase Order No.
                    </Text>
                    <Text variant="bodyLarge">{purchaseOrder.id}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text variant="labelLarge" style={styles.label}>
                        PO Date
                    </Text>
                    <Text variant="bodyLarge">
                        {purchaseOrder.transactionDate.toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailItem}>
                    <Text variant="labelLarge" style={styles.label}>
                        Expected Delivery Date
                    </Text>
                    <Text variant="bodyLarge">
                        {purchaseOrder.expectedDeliveryDate.toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailItem}>
                    <Text variant="labelLarge" style={styles.label}>
                        Supplier
                    </Text>
                    <Text variant="bodyLarge">
                        {purchaseOrder.supplier?.name || 'N/A'}
                    </Text>
                </View>

                <View style={[styles.detailItem]}>
                    <Text variant="labelLarge" style={styles.label}>
                        Remarks
                    </Text>
                    <Text variant="bodyMedium">
                        {purchaseOrder.remarks || 'No remarks'}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        elevation: 4,
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'flex-start',
    },
    detailItem: {
        minWidth: 170,
        flexGrow: 0,
    },
    remarksItem: {
        minWidth: '100%',  // Remarks will always take full width
    },
    label: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
});
