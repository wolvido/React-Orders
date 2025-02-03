import * as React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { DatePickerInput } from 'react-native-paper-dates';
import { dummyCustomers } from '@/dummy-data/dummy-customers';
import CustomersSelection from './costumers-selection';
import { Customer } from '@/entities/customers';
import { Order } from '@/entities/order';
import PaymentMethod from '@/entities/payment-method';
import theme from '@/style/theme';

// Define props interface
interface OrderDetailsFormProps {
  redirectTo: RelativePathString | ExternalPathString;
}

function OrderDetailsForm({ redirectTo }: OrderDetailsFormProps) {
    const router = useRouter();

    //form Handling logic
    const [formData, setFormData] = useState<Order>({
        id: Math.floor(1000000 + Math.random() * 9000000),
        orderType: {
          type: "Cash",
          amountDue: 0,
          cashTendered: 0,
          changeDue: 0
        } as PaymentMethod,
        customer: {
          id: 0,
          name: '',
          email: ''
        },
        transactionDate: new Date(),
        total: 0,
        orderStatus: Status.Pending,
        fulfillmentStatus: PaymentStatus.unPaid,
        remarks: '',
        deliveryAddress: '',
        cart: {
          items: [],
          total: 0
        }
    });

    const handleInputChange = useCallback((field: keyof Order, value: string | Date) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    }, []);
  
    const handleSubmit = useCallback(async () => {
      await Promise.resolve();
      if (redirectTo) {
          router.push(redirectTo);
      }
  }, [redirectTo, router]);
    
    //customers modal controller
    const [visibleCustomers, setVisibleCustomers] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const showCustomersModal = () => setVisibleCustomers(true);
    const hideCustomersModal = () => setVisibleCustomers(false);

    const handleCustomerSelect = (customer: Customer) => {
      setSelectedCustomer(customer);
  };

  return (
    <View style={{ gap: 10, padding: 16 }}>

      <DatePickerInput
        locale="en"
        label="Transaction Date"
        value={formData.transactionDate}
        onChange={(date) => handleInputChange('transactionDate', date as Date)}
        mode="outlined"
        inputMode="start"
      />

      <Button
          mode="outlined"
          onPress={showCustomersModal}
          style={[styles.input, styles.customerButton]}
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

      <CustomersSelection 
        visible={visibleCustomers}
        hideModal={hideCustomersModal}
        customers={dummyCustomers}
        onSelectCustomer={handleCustomerSelect}
      />

      <Pressable 
          onPress={handleSubmit}
          style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.8 : 1 }
          ]}
      >
          <Text style={styles.buttonText}>
              Submit
          </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: theme.colors.primary,
      height: 40,
      paddingHorizontal: 16,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
      textTransform: 'uppercase'
  },    
  input: {
    marginBottom: 16,
  },
  customerButton: {
    height: 56,
    borderRadius: 4,
    justifyContent: 'center',
  },
  customerButtonContent: {
      flexDirection: 'row-reverse', // Puts icon on right side
      justifyContent: 'space-between',
      height: '100%',
  },
  customerButtonText: {
      textAlign: 'left',
      flex: 1,
      color: '#000000',
  },
  customerButtonPlaceholder: {
      color: '#666666',
  },
});

export default OrderDetailsForm;