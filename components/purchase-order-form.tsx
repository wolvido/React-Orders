import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { PurchaseOrder } from '@/entities/purchase-order';
import { Delivery } from '@/entities/delivery';
import AddDeliveryForm from './add-delivery-form';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { DatePicker } from './date-picker';

interface PurchaseOrderFormProps {
    purchaseOrder: PurchaseOrder | null;
    onSubmit: (data: PurchaseOrder) => void;
}

export const PurchaseOrderForm = ({ purchaseOrder, onSubmit }: PurchaseOrderFormProps) => {
    const handleDeliverySubmit = (deliveryData: Delivery) => {
        const updatedPurchaseOrder: PurchaseOrder = {
            ...(purchaseOrder || {
                id: 0,
                remarks: '',
                transactionDate: new Date(),
                preparedBy: '',
                status: Status.Pending,
                paymentStatus: PaymentStatus.unPaid,
            } as PurchaseOrder),
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
                    value={purchaseOrder?.id.toString()}
                    mode="outlined"
                    editable={false}
                    style={styles.input}
                />

                <DatePicker
                    label="PO Date"
                    value={purchaseOrder?.transactionDate ?? null}
                    onChange={() => {}}
                />

                <TextInput
                    label="Remarks"
                    value={purchaseOrder?.remarks}
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
                    suppliers={purchaseOrder?.delivery?.supplier ? [purchaseOrder.delivery.supplier] : []}
                    existingDelivery={purchaseOrder?.delivery}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
