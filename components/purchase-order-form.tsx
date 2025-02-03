import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText, Text, SegmentedButtons } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { PurchaseOrder } from '@/entities/purchase-order';

interface PurchaseOrderFormProps {
    onSubmit: (data: Partial<PurchaseOrder>) => void;
    initialData?: PurchaseOrder;
}

export const PurchaseOrderForm = ({ onSubmit, initialData }: PurchaseOrderFormProps) => {
    const [formData, setFormData] = useState({
        remarks: '',
        transactionDate: new Date(),
        preparedBy: '',
        status: Status.Pending,
        paymentStatus: PaymentStatus.unPaid
    });

    const [errors, setErrors] = useState({
        remarks: '',
        preparedBy: ''
    });

    // Populate form when initialData is provided
    useEffect(() => {
        if (initialData) {
            setFormData({
                remarks: initialData.remarks,
                transactionDate: initialData.transactionDate,
                preparedBy: initialData.preparedBy,
                status: initialData.status,
                paymentStatus: initialData.paymentStatus
            });
        }
    }, [initialData]);

    // Validate and update form data
    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user types
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Validate and submit on every change
        validateAndSubmit({
            ...formData,
            [field]: value
        });
    };

    const validateAndSubmit = (data: typeof formData) => {
        let isValid = true;
        const newErrors = {
            remarks: '',
            preparedBy: ''
        };

        // Validate remarks
        if (!data.remarks.trim()) {
            newErrors.remarks = 'Remarks is required';
            isValid = false;
        }

        // Validate preparedBy
        if (!data.preparedBy.trim()) {
            newErrors.preparedBy = 'Prepared By is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            const submitData: Partial<PurchaseOrder> = {
                ...data,
                id: initialData?.id // Include ID if editing existing order
            };
            onSubmit(submitData);
        }
    };

    return (
        <View style={styles.container}>

            {errors.remarks && (
                <HelperText type="error" visible={!!errors.remarks}>
                    {errors.remarks}
                </HelperText>
            )}

            <DatePickerInput
                locale="en"
                label="Transaction Date"
                value={formData.transactionDate}
                onChange={(date) => date && handleChange('transactionDate', date)}
                mode="outlined"
                style={styles.input}
                inputMode="start"
            />

            <TextInput
                label="Prepared By"
                value={formData.preparedBy}
                onChangeText={(value) => handleChange('preparedBy', value)}
                mode="outlined"
                style={styles.input}
                error={!!errors.preparedBy}
            />

            <TextInput
                label="Remarks"
                value={formData.remarks}
                onChangeText={(value) => handleChange('remarks', value)}
                mode="outlined"
                style={styles.input}
                error={!!errors.remarks}
            />
            {errors.preparedBy && (
                <HelperText type="error" visible={!!errors.preparedBy}>
                    {errors.preparedBy}
                </HelperText>
            )}

            {/* <Text variant="bodyLarge" style={styles.label}>Status</Text>
            <SegmentedButtons
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
                buttons={[
                    { value: Status.Pending, label: 'Pending' },
                    { value: Status.Delivered, label: 'Fulfilled' },
                    { value: Status.Cancelled, label: 'Cancelled' },
                ]}
                style={styles.segmentedButton}
            /> */}

            {/* <Text variant="bodyLarge" style={styles.label}>Payment Status</Text>
            <SegmentedButtons
                value={formData.paymentStatus}
                onValueChange={(value) => handleChange('paymentStatus', value)}
                buttons={[
                    { value: PaymentStatus.unPaid, label: 'Unpaid' },
                    { value: PaymentStatus.partialPaid, label: 'Partial' },
                    { value: PaymentStatus.paid, label: 'Paid' },
                ]}
                style={styles.segmentedButton}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 8
    },
    input: {
        marginBottom: 8,
    },
    label: {
        marginTop: 8,
        marginBottom: 4,
    },
    segmentedButton: {
        marginBottom: 16,
    }
});

export default PurchaseOrderForm;
