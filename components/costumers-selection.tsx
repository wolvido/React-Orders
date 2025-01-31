// CustomersSelection.tsx
import { dummyCustomers } from "@/dummy-data/dummy-customers";
import { Customer } from "@/entities/customers";
import { Modal, Portal, List } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

interface CustomersSelectionProps {
    customers: Customer[];
    visible: boolean;
    hideModal: () => void;
    onSelectCustomer: (customer: Customer) => void;
}

function CustomersSelection({ customers, visible, hideModal, onSelectCustomer }: CustomersSelectionProps) {
    const handleCustomerSelect = (customer: Customer) => {
        onSelectCustomer(customer);
        hideModal();
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 20,
                    margin: 20,
                    borderRadius: 8,
                }}
            >
                <ScrollView>
                    <List.Section>
                        {customers.map((customer) => (
                            <List.Item
                                key={customer.id}
                                title={customer.name}
                                description={customer.email}
                                onPress={() => handleCustomerSelect(customer)}
                                left={props => <List.Icon {...props} icon="account" />}
                            />
                        ))}
                    </List.Section>
                </ScrollView>
            </Modal>
        </Portal>
    );
}

export default CustomersSelection;
