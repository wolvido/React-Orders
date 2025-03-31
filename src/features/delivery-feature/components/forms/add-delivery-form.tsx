import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import { Button, TextInput, Text, List } from 'react-native-paper';
import { Supplier } from '@/src/entities/supplier/type/supplier';
import { Delivery } from '@/src/entities/delivery/type/delivery';
import { DatePicker } from '../../../../shared/ui/date-picker';
import { SuppliersSelection } from '@/src/entities/supplier/ui/suppliers-selection';

interface AddDeliveryFormProps {
    suppliers: Supplier[];
    onSubmit: (delivery: Delivery) => void;
    existingDelivery?: Delivery; // Optional delivery to edit
    currentUser?: { username: string };
}

export const AddDeliveryForm = ({ suppliers, onSubmit, existingDelivery, currentUser }: AddDeliveryFormProps) => {
    const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [deliveredBy, setDeliveredBy] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [handledBy, setHandledBy] = useState(currentUser?.username || '');
    const [supplier, setSupplier] = useState<Supplier | null>(null);
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
            id: existingDelivery?.id || 0,
            supplier: supplier,
            deliveryDate: deliveryDate,
            deliveredBy: deliveredBy,
            total: 0,
            receiptNumber: receiptNumber,
            creationDate: creationDate,
            handledBy: handledBy,
        };

        onSubmit(newDelivery);
    };

    return (
        <View>
            <View style={styles.form}>
                <SuppliersSelection
                    suppliers={suppliers}
                    onSupplierSelect={setSupplier}
                    existingSupplier={supplier}
                />

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
                    editable={!handledBy}
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

