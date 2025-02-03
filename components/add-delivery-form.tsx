import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import { Button, TextInput, Text, List } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { Supplier } from '@/entities/supplier';
import { Delivery } from '@/entities/delivery';

interface AddDeliveryFormProps {
    suppliers: Supplier[];
    onSubmit: (delivery: Delivery) => void;
    existingDelivery?: Delivery; // Optional delivery to edit
}

export const AddDeliveryForm = ({ suppliers, onSubmit, existingDelivery }: AddDeliveryFormProps) => {
    const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [deliveredBy, setDeliveredBy] = useState('');
    const [cost, setCost] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [showSupplierModal, setShowSupplierModal] = useState(false);

    // Populate form when existingDelivery is provided
    useEffect(() => {
        if (existingDelivery) {
            setDeliveryDate(existingDelivery.deliveryDate);
            setDueDate(existingDelivery.dueDate);
            setDeliveredBy(existingDelivery.deliveredBy);
            setCost(existingDelivery.total.toString());
            setReceiptNumber(existingDelivery.receiptNumber);
            setSupplier(existingDelivery.supplier);
        }
    }, [existingDelivery]);

    const handleSubmit = () => {
        if (!supplier) return;

        const newDelivery: Delivery = {
            id: existingDelivery?.id || Date.now() + Math.floor(100000 + Math.random() * 900000),
            supplier: supplier,
            deliveryDate: deliveryDate,
            deliveredBy: deliveredBy,
            total: parseFloat(cost) || 0,
            receiptNumber: receiptNumber,
            dueDate: dueDate,
            receivedItems: existingDelivery?.receivedItems || { total: 0, items: [] },
        };

        onSubmit(newDelivery);
    };

    const handleSupplierSelect = (selectedSupplier: Supplier) => {
        setSupplier(selectedSupplier);
        setShowSupplierModal(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Button
                    mode="outlined"
                    onPress={() => setShowSupplierModal(true)}
                    style={[styles.input, styles.supplierButton]}
                    contentStyle={styles.supplierButtonContent}
                    icon="menu-down"
                >
                    <Text style={[
                        styles.supplierButtonText,
                        !supplier && styles.supplierButtonPlaceholder
                    ]}>
                        {supplier ? supplier.name : 'Select Supplier'}
                    </Text>
                </Button>

                <DatePickerInput
                    locale="en"
                    label="Delivery Date"
                    value={deliveryDate}
                    onChange={(d) => d && setDeliveryDate(d)}
                    mode="outlined"
                    style={styles.input}
                    inputMode='start'
                />

                <DatePickerInput
                    locale="en"
                    label="Due Date"
                    value={dueDate}
                    onChange={(d) => d && setDueDate(d)}
                    mode="outlined"
                    style={styles.input}
                    inputMode='start'
                />

                <TextInput
                    label="Delivered By"
                    value={deliveredBy}
                    onChangeText={setDeliveredBy}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Cost"
                    value={cost}
                    onChangeText={setCost}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Receipt Number"
                    value={receiptNumber}
                    onChangeText={setReceiptNumber}
                    mode="outlined"
                    style={styles.input}
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    disabled={!supplier}
                >
                    Submit Delivery
                </Button>
            </View>

            <Modal
                visible={showSupplierModal}
                onDismiss={() => setShowSupplierModal(false)}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text variant="headlineMedium" style={styles.modalTitle}>
                        Select Supplier
                    </Text>
                    <ScrollView>
                        {suppliers.map((sup) => (
                            <List.Item
                                key={sup.id}
                                title={sup.name}
                                description={sup.address}
                                onPress={() => handleSupplierSelect(sup)}
                                right={props => <List.Icon {...props} icon="chevron-right" />}
                            />
                        ))}
                    </ScrollView>
                    
                    <Button
                        mode="contained"
                        onPress={() => setShowSupplierModal(false)}
                        style={styles.modalCloseButton}
                    >
                        Close
                    </Button>
                    
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    modalTitle: {
        marginBottom: 16,
        textAlign: 'center',
    },
    modalCloseButton: {
        marginTop: 16,
    },    
    supplierButton: {
        height: 56, // Match TextInput height
        borderRadius: 4,
        justifyContent: 'center',
    },
    supplierButtonContent: {
        flexDirection: 'row-reverse', // Puts icon on right side
        justifyContent: 'space-between',
        height: '100%',
    },
    supplierButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
    },
    supplierButtonPlaceholder: {
        color: '#666666',
    },
});

export default AddDeliveryForm;
