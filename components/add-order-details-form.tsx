import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { DatePickerInput } from 'react-native-paper-dates';
import CustomersSelection from './costumers-selection';
import { Customer } from '@/entities/customers';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import { DatePicker } from './date-picker';

// Define props interface
interface OrderDetailsFormProps {
    onSubmit: (order: Order) => void;
    customers: Customer[];
    order?: Order;
    currentUser?: { username: string };
}

function OrderDetailsForm({ onSubmit, customers, order, currentUser }: OrderDetailsFormProps) {
    //form Handling logic
    useEffect(() => {
        if (order?.customer) {
            const defaultCustomer = order.customer;
            setSelectedCustomer(defaultCustomer);
            setFormData(prev => ({
                ...prev,
                customer: defaultCustomer
            }));
        }
    }, [customers]);

    const [formData, setFormData] = useState<Order>({
        id: order?.id || 0,
        orderType: order?.orderType || '',
        customer: {
            id: order?.customer.id || 0,
            name: order?.customer.name || 'Walk-in',
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
        handledBy: order?.handledBy || currentUser?.username || '', 
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
    }, [formData, onSubmit]);
    
    //customers modal controller
    const [visibleCustomers, setVisibleCustomers] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const showCustomersModal = () => setVisibleCustomers(true);
    const hideCustomersModal = () => setVisibleCustomers(false);

    const handleCustomerSelect = (customer: Customer) => {
        console.log('Selected Customer:', customer);
        setSelectedCustomer(customer);
        setFormData(prev => ({
            ...prev,
            customer: customer
        }));
    };

    return (
        <View style={styles.container}>
            <DatePicker
                label="Transaction Date"
                value={formData.transactionDate}
                onChange={(date) => handleInputChange('transactionDate', date as Date)}
            />
            <View style={styles.customerInputContainer}>
                {selectedCustomer && (
                    <Text style={styles.customerLabel}>
                        Customer
                    </Text>
                )}
                <Button
                    mode="outlined"
                    onPress={showCustomersModal}
                    style={styles.customerButton}
                    contentStyle={styles.customerButtonContent}
                    icon="menu-down"
                >
                    <Text style={[
                        styles.customerButtonText,
                        !selectedCustomer && styles.customerButtonPlaceholder
                    ]}>
                        {selectedCustomer ? selectedCustomer.name : 'Select Customer'}
                    </Text>
                </Button>
            </View>

            <TextInput
                mode="outlined"
                label="Delivery Address"
                value={formData.deliveryAddress}
                onChangeText={(value) => handleInputChange('deliveryAddress', value)}
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
                disabled={!selectedCustomer}
            >
                Submit Order Details
            </Button>

            <CustomersSelection 
                visible={visibleCustomers}
                hideModal={hideCustomersModal}
                customers={customers}
                onSelectCustomer={handleCustomerSelect}
            />
    </View>
    );
}

const styles = StyleSheet.create({
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
    customerInputContainer: {
        position: 'relative',
    },
    customerLabel: {
        position: 'absolute',
        top: -8,
        left: 12,
        fontSize: 12,
        color: '#000000',
        backgroundColor: 'white',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    customerButton: {
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    customerButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: '100%',
    },
    customerButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
    customerButtonPlaceholder: {
        color: '#666666',
    },
    
});

export default OrderDetailsForm;
