import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { PurchaseOrder } from '@/entities/purchase-order';
import { Delivery } from '@/entities/delivery';
import AddDeliveryForm from './add-delivery-form';

interface PurchaseOrderFormProps {
    purchaseOrder: PurchaseOrder;
    onSubmit: (data: PurchaseOrder) => void;
}

export const PurchaseOrderForm = ({ purchaseOrder, onSubmit }: PurchaseOrderFormProps) => {
    const handleDeliverySubmit = (deliveryData: Delivery) => {
        // Combine PO data with new delivery data
        const updatedPurchaseOrder: PurchaseOrder = {
            ...purchaseOrder,
            delivery: deliveryData
        };
        onSubmit(updatedPurchaseOrder);
    };

    return (
        <View style={styles.container}>
            {/* Read-only Purchase Order Details */}
            <View style={styles.poDetailsSection}>
                <TextInput
                    label="PO #"
                    value={purchaseOrder.id.toString()}
                    mode="outlined"
                    editable={false}
                    style={styles.input}
                />

                <DatePickerInput
                    locale="en"
                    label="PO Date"
                    value={purchaseOrder.transactionDate}
                    onChange={() => {}}
                    mode="outlined"
                    style={[styles.input, styles.dateInput]}
                    inputMode="start"
                    editable={false}
                    // removed disabled prop
                />

                <TextInput
                    label="Remarks"
                    value={purchaseOrder.remarks}
                    mode="outlined"
                    editable={false}
                    style={styles.input}
                    multiline
                />
            </View>

            {/* Delivery Form Section */}
            <View style={styles.deliverySection}>
                <AddDeliveryForm 
                    onSubmit={handleDeliverySubmit}
                    suppliers={[purchaseOrder.delivery?.supplier]}
                    existingDelivery={purchaseOrder.delivery}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    poDetailsSection: {
        backgroundColor: '#f5f5f5',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
    },
    deliverySection: {
        flex: 1,
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    dateInput: {
        backgroundColor: '#fff',
        opacity: 1, // Ensures the text is fully visible
    }
});

export default PurchaseOrderForm;
