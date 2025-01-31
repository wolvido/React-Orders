import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';
import Status from '@/enums/status';
import PaymentStatus from '@/enums/payment-status';
import { DatePickerInput } from 'react-native-paper-dates';

import { dummyCustomers } from '@/dummy-data/dummy-customers';
import CustomersSelection from './costumers-selection';

import { Customer } from '@/entities/customers';

import { order } from '@/entities/order';

import PaymentMethod from '@/entities/payment-method';

// Define props interface
interface OrderDetailsFormProps {
  redirectTo: RelativePathString | ExternalPathString;
}

function OrderDetailsForm({ redirectTo }: OrderDetailsFormProps) {
    const router = useRouter();

    //form Handling logic
    const [formData, setFormData] = useState<order>({
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
        fulfillmentStatus: PaymentStatus.unPaid
    });

    const handleInputChange = (field: keyof order, value: string | Date) => {
        setFormData(prevData => ({
          ...prevData,
          [field]: value
        }));
      };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        console.log('Router object:', router);
        if (redirectTo){
          router.push(redirectTo);
        }
    };

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
      {/* <TextInput
        label="Order Type"
        value={formData.orderType}
        onChangeText={(value) => handleInputChange('orderType', value)}
        mode="outlined"
      /> */}

      <DatePickerInput
        locale="en"
        label="Transaction Date"
        value={formData.transactionDate}
        onChange={(date) => handleInputChange('transactionDate', date as Date)}
        mode="outlined"
        inputMode="start"
      />

      {/* <TextInput
        label="Total"
        value={formData.total.toString()}
        onChangeText={(value) => handleInputChange('total', value)}
        keyboardType="numeric"
        mode="outlined"
      /> */}


      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8 
        }}>
        <TextInput
            mode="outlined"
            label="Customer"
            value={selectedCustomer ? selectedCustomer.name : ''}
            editable={false}
            style={{ flex: 1 }}
        />
        <Button 
            mode="contained" 
            onPress={showCustomersModal}
        >
            Select Customer
        </Button>
      </View>

      <CustomersSelection 
        visible={visibleCustomers}
        hideModal={hideCustomersModal}
        customers={dummyCustomers}
        onSelectCustomer={handleCustomerSelect}
      />

      <Button 
        mode="contained" 
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </View>
  );
}

export default OrderDetailsForm;