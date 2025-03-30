import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, List } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import Status from '@/src/shared/enums/status';
import PaymentStatus from '@/src/shared/enums/payment-status';
import { CustomersSelection } from '../../../../shared/components/costumers-selection';
import { Customer } from '@/src/entities/customer/type/customers';
import { Order } from '@/src/entities/order/type/order';
import { DatePicker } from '../../../../shared/components/date-picker';
import { ProductSchema } from '../../../../entities/product-schema/type/product-schema';
import ProductSchemaSelection from '../product-schema/product-schema-selection';

// Define props interface
interface OrderDetailsFormProps {
    onSubmit: (order: Order) => void;
    customers: Customer[];
    order?: Order;
    currentUser?: { username: string };
    schemas: ProductSchema[];
    onSchemaSelect: (schema: ProductSchema) => void;
    defaultSchema?: ProductSchema;
}

function OrderDetailsForm({ onSubmit, customers, order, currentUser, schemas, onSchemaSelect, defaultSchema }: OrderDetailsFormProps) {

    const [formData, setFormData] = useState<Order>({
        id: order?.id || 0,
        orderType: order?.orderType || '',
        customer: {
            id: order?.customer.id || 0,
            name: order?.customer.name || '',
            contactNumber: order?.customer.contactNumber || '',
            address: order?.customer.address || ''
        },
        transactionDate: order?.transactionDate || new Date(),
        balance: order?.balance || 0,
        total: order?.total || 0,
        orderStatus: order?.orderStatus || PaymentStatus.unPaid,
        fulfillmentStatus: order?.fulfillmentStatus || Status.Pending,
        remarks: order?.remarks || '',
        deliveryAddress: order?.deliveryAddress || '',
        handledBy: currentUser?.username || order?.handledBy || '', 
        isPaid: order?.isPaid || false,
        isComplete: order?.isPaid || false
    });
    
    const handleInputChange = useCallback((field: keyof Order, value: string | Date) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    }, []);
  
    const handleSubmit = useCallback(() => {
        // Validate form data here if needed
        const isValid = formData.customer.id !== null; // Add more validation as needed
        
        if (isValid) {
            onSubmit(formData);
        }

        console.log('costumer', formData.customer);
    }, [formData, onSubmit]);
    
    const handleCustomerSelect = (customer: Customer) => {
        console.log('Selected Customer:', customer);

        setFormData(prev => ({
            ...prev,
            customer: customer
        }));
    };

    const [isSchemaSelected, setIsSchemaSelected] = useState(false);
    const handleSchemaSelect = (schema: ProductSchema) => {
        setIsSchemaSelected(true);
        onSchemaSelect(schema);
    };

    // Set default schema if provided
    useEffect(() => {
        if (defaultSchema) {
            setIsSchemaSelected(true);
            handleSchemaSelect(defaultSchema);
        }
    }, []);

    return (
        <View style={styles.container}>
            <DatePicker
                label="Transaction Date"
                value={formData.transactionDate}
                onChange={(date) => handleInputChange('transactionDate', date as Date)}
            />

            <CustomersSelection
                customers={customers}
                onCustomerSelect={handleCustomerSelect}
                existingCustomer={formData.customer}
            />

            <ProductSchemaSelection
                schemas={schemas}
                onSchemaSelect={handleSchemaSelect}
                defaultSchema={defaultSchema}
            />

            <TextInput
                mode="outlined"
                label="Handled By"
                value={formData.handledBy}
                onChangeText={(value) => handleInputChange('handledBy', value)}
                editable={!formData.handledBy}
            />

            <TextInput
                mode="outlined"
                label="Order Type"
                value={formData.orderType}
                onChangeText={(value) => handleInputChange('orderType', value)}
            />

            {(formData.remarks !== null && formData.remarks !== undefined && formData.remarks !== "") && (
                <TextInput
                    mode="outlined"
                    label="Remarks"
                    value={formData.remarks}
                    onChangeText={(value) => handleInputChange('remarks', value)}
                />
            )}

            <Button 
                mode="contained"
                onPress={handleSubmit}
                disabled={!formData.customer.id || !isSchemaSelected}
            >
                Submit Order Details
            </Button>

    </View>
    );
}

const styles = StyleSheet.create({
    schemaInputContainer: {
        position: 'relative',
    },
    schemaLabel: {
        position: 'absolute',
        top: -8,
        left: 12,
        fontSize: 12,
        color: '#000000',
        backgroundColor: 'white',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    schemaButton: {
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    schemaButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: '100%',
    },
    schemaButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
    schemaButtonPlaceholder: {
        color: '#666666',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        maxHeight: '80%',
        borderRadius: 8,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
    },
    datePickerWrapper: {
        marginBottom: 35,
        marginTop: 40,
    },


    
});

export default OrderDetailsForm;
