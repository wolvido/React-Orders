import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import { Button, TextInput, Text, List } from 'react-native-paper';
import { Supplier } from '@/entities/supplier';
import { Delivery } from '@/entities/delivery';
import { DatePicker } from './date-picker';

interface AddDeliveryFormProps {
    suppliers: Supplier[];
    onSubmit: (delivery: Delivery) => void;
    existingDelivery?: Delivery; // Optional delivery to edit
}

export const AddDeliveryForm = ({ suppliers, onSubmit, existingDelivery }: AddDeliveryFormProps) => {
    const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [deliveredBy, setDeliveredBy] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [handledBy, setHandledBy] = useState('');
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [total, setTotal] = useState(0);

    // Populate form when existingDelivery is provided
    useEffect(() => {
        if (existingDelivery) {
            setDeliveryDate(existingDelivery.deliveryDate);
            setDeliveredBy(existingDelivery.deliveredBy);
            setReceiptNumber(existingDelivery.receiptNumber);
            setSupplier(existingDelivery.supplier);
            setHandledBy(existingDelivery.handledBy);
            setTotal(existingDelivery.total);
        }

        setCreationDate(new Date());

        //if supplier only has one value, set it as the supplier
        if (suppliers.length === 1 && !supplier) {
            setSupplier(suppliers[0]);
        }
    }, [existingDelivery]);

    const handleSubmit = () => {
        if (!supplier) return;

        const newDelivery: Delivery = {
            id: existingDelivery?.id || Date.now() + Math.floor(100000 + Math.random() * 900000),
            supplier: supplier,
            deliveryDate: deliveryDate,
            deliveredBy: deliveredBy,
            total: 0,
            receiptNumber: receiptNumber,
            creationDate: creationDate,
            handledBy: handledBy,
            //receivedItems: existingDelivery?.receivedItems || { total: 0, items: [], deliveryId: Date.now() + Math.floor(100000 + Math.random() * 900000) },
        };

        onSubmit(newDelivery);
    };

    const handleSupplierSelect = (selectedSupplier: Supplier) => {
        setSupplier(selectedSupplier);
        setShowSupplierModal(false);
    };

    return (
        <View>
            <View style={styles.form}>
            {supplier && (
                    <Text style={styles.supplierLabel}>
                        Supplier
                    </Text>
                )}
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

                <DatePicker
                    label="Delivery Date"
                    value={deliveryDate}
                    onChange={(d) => d && setDeliveryDate(d)}
                />

                <TextInput
                    label="Delivered By"
                    value={deliveredBy}
                    onChangeText={setDeliveredBy}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Handled By"
                    value={handledBy}
                    onChangeText={setHandledBy}
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
                    Submit Delivery Form
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
                    <FlatList
                        data={suppliers}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        renderItem={({ item }) => (
                            <List.Item
                                key={item.id}
                                title={item.name}
                                description={item.address}
                                onPress={() => handleSupplierSelect(item)}
                                right={props => <List.Icon {...props} icon="chevron-right" />}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={() => (
                            <List.Item
                                title="Suppliers Loading..."
                                description="Please wait"
                            />
                        )}
                    />
                    <Button
                        mode="contained"
                        onPress={() => setShowSupplierModal(false)}
                        style={styles.modalCloseButton}
                    >
                        Close
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
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
    supplierInputContainer: {
        marginBottom: 16,
        position: 'relative',
        height: 56, // Match TextInput height
    },
    supplierLabel: {
        position: 'absolute',
        left: 16,
        top: 16,
        fontSize: 16,
        color: '#666666',
        backgroundColor: 'transparent',
        zIndex: 1,
        transform: [{translateY: 0}],
    },
    supplierLabelSelected: {
        top: -8,
        left: 12,
        fontSize: 12,
        color: '#000000',
        backgroundColor: 'white',
        paddingHorizontal: 4,
    },
    supplierButton: {
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    supplierButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: '100%',
    },
    supplierButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
    supplierButtonPlaceholder: {
        color: '#666666',
    },
    container: {

    },
    form: {
        padding: 16
    },
    input: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 16,
    }
});

export default AddDeliveryForm;

