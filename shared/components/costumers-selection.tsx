// CustomersSelection.tsx
import { Customer } from "../entities/customers";
import { Portal, List, Button, Text, Searchbar } from 'react-native-paper';
import { Modal, StyleSheet, FlatList, View } from 'react-native';
import { useState, useCallback } from 'react';

interface CustomersSelectionProps {
    customers: Customer[];
    onCustomerSelect: (customer: Customer) => void;
    existingCustomer?: Customer | null;
}

export function CustomersSelection({ 
    customers, 
    onCustomerSelect,
    existingCustomer
}: CustomersSelectionProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(existingCustomer || null);

    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (customer.contactNumber && customer.contactNumber.includes(searchQuery))
    );

    const handleCustomerSelect = ( customer: Customer) => {
        onCustomerSelect(customer);
        setSelectedCustomer(customer);
        setIsVisible(false);
    };

    const renderItem = useCallback(({ item }: { item: Customer }) => (
        <List.Item
            key={item.id}
            title={item.name}
            description={item.contactNumber}
            onPress={() => handleCustomerSelect(item)}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
        />
    ), [handleCustomerSelect]);

    return (
        <>
        <View style={styles.customerInputContainer}>
            {selectedCustomer && (
                <Text style={styles.customerLabel}>
                    Customer
                </Text>
            )}
            <Button
                mode="outlined"
                onPress={() => setIsVisible(true)}
                style={styles.customerButton}
                contentStyle={styles.customerButtonContent}
                icon="menu-down"
            >
                <Text style={[
                    styles.customerButtonText,
                    !selectedCustomer?.id && styles.customerButtonPlaceholder
                ]}>
                    {selectedCustomer?.id ? selectedCustomer.name : 'Select Customer'}
                </Text>
            </Button>
        </View>

        <Portal>
            <Modal
                visible={isVisible}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text variant="headlineMedium" style={styles.modalTitle}>
                        Select Customer
                    </Text>

                    <Searchbar
                        placeholder="Search customers..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        autoCapitalize="none" 
                    />

                    <FlatList
                        data={filteredCustomers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.flatList}
                        initialNumToRender={15}
                        maxToRenderPerBatch={20}
                        windowSize={5}
                        removeClippedSubviews={true}
                        keyboardShouldPersistTaps="handled"
                        ListEmptyComponent={() => (
                            <List.Item
                                title="Customers Loading..."
                                description="Please wait" />
                        )}
                    />

                    <Button
                        mode="contained"
                        onPress={() => setIsVisible(false)}
                        style={styles.closeButton}
                    >
                        Close
                    </Button>
                </View>
            </Modal>
        </Portal></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    customerInputContainer: {
        position: 'relative',
    },
    flatList: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16,
        gap: 8
    },
    button: {
        flex: 1
    },
    modalTitle: {
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 16,
    },
    searchBar: {
        marginHorizontal: 16,
        marginBottom: 8,
    },
    closeButton: {
        margin: 16,
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
