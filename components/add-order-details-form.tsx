import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useCallback, useState } from 'react';
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
}

function OrderDetailsForm({ onSubmit, customers }: OrderDetailsFormProps) {
    //form Handling logic
    const [formData, setFormData] = useState<Order>({
        id: Math.floor(1000000 + Math.random() * 9000000),
        referenceNo: Math.floor(1000000 + Math.random() * 9000000), // Added
        orderType: '',
        customer: {
            id: 0,
            name: 'Walk-in',
            contactNumber: '',
            address: ''
        },
        transactionDate: new Date(),
        balance: 0,
        total: 0,
        orderStatus: PaymentStatus.unPaid,
        fulfillmentStatus: Status.Pending,
        remarks: '',
        deliveryAddress: '',
        cart: {
            items: [],
            total: 0
        },
        handledBy: '', 
        isPaid: false,
        isComplete: false
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
            />

            <TextInput
                mode="outlined"
                label="Order Type"
                value={formData.orderType}
                onChangeText={(value) => handleInputChange('orderType', value)}
            />

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
