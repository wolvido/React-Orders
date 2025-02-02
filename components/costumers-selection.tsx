// CustomersSelection.tsx
import { dummyCustomers } from "@/dummy-data/dummy-customers";
import { Customer } from "@/entities/customers";
import { Portal, List, Button, Text} from 'react-native-paper';
import { Modal, ScrollView, StyleSheet } from 'react-native';

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
                animationType="slide"

            >
                <Text variant="headlineMedium" style={styles.modalTitle}>
                    Select Customer
                </Text>
                <ScrollView>
                    <List.Section>
                        {customers.map((customer) => (
                            <List.Item
                                key={customer.id}
                                title={customer.name}
                                description={customer.email}
                                onPress={() => handleCustomerSelect(customer)}
                                left={props => <List.Icon {...props} icon="account" />}
                                right={props => <List.Icon {...props} icon="chevron-right" />}
                            />
                        ))}
                    </List.Section>
                </ScrollView>
                <Button
                        mode="contained"
                        onPress={hideModal}
                        style={styles.closeButton}
                    >
                        Close
                </Button>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    closeButton: {
        margin: 16,
    },
    modalTitle: {
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default CustomersSelection;
