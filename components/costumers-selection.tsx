// CustomersSelection.tsx
import { Customer } from "@/entities/customers";
import { Portal, List, Button, Text} from 'react-native-paper';
import { Modal, StyleSheet, FlatList, View } from 'react-native';

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

    const renderItem = ({ item }: { item: Customer }) => (
        <List.Item
            key={item.id}
            title={item.name}
            description={item.contactNumber}
            onPress={() => handleCustomerSelect(item)}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
        />
    );

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text variant="headlineMedium" style={styles.modalTitle}>
                        Select Customer
                    </Text>
                    
                    <FlatList
                        data={customers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.flatList}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={() => (
                            <List.Item
                                title="No customers found"
                                description="No customers available"
                            />
                        )}
                    />

                    <Button
                        mode="contained"
                        onPress={hideModal}
                        style={styles.closeButton}
                    >
                        Close
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatList: {
        flex: 1,
    },
    closeButton: {
        margin: 16,
    },
    modalTitle: {
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default CustomersSelection;
