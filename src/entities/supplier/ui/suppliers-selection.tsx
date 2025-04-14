import { useState } from "react";
import { Supplier } from "../type/supplier";
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import { Button, TextInput, Text, List, Portal, Searchbar } from 'react-native-paper';

interface SuppliersSelectionProps {
    suppliers: Supplier[];
    onSupplierSelect: (supplier: Supplier) => void;
    existingSupplier?: Supplier | null;
}

export const SuppliersSelection = ({
    suppliers,
    onSupplierSelect,
    existingSupplier
}: SuppliersSelectionProps) => {

    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [supplier, setSupplier] = useState<Supplier | null>(existingSupplier || null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (supplier.contactNumber && supplier.contactNumber.includes(searchQuery))
    );

    const handleSupplierSelect = (selectedSupplier: Supplier) => {
        onSupplierSelect(selectedSupplier);
        setSupplier(selectedSupplier);
        setShowSupplierModal(false);
    };
    
    return (
        <>
        {supplier && (
            <Text style={styles.supplierLabel}>
                Supplier
            </Text>
        )}
        <Button
            mode="outlined"
            onPress={() => setShowSupplierModal(true)}
            style={[styles.input, styles.supplierButton]}
            contentStyle={styles.supplierButtonContent}
            icon="menu-down"
        >
            <Text style={[
                styles.supplierButtonText,
                !existingSupplier && styles.supplierButtonPlaceholder
            ]}>
                {existingSupplier ? existingSupplier.name : 'Select Supplier'}
            </Text>
        </Button>

        <Portal>
            <Modal
                visible={showSupplierModal}
                onDismiss={() => setShowSupplierModal(false)}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text variant="headlineMedium" style={styles.modalTitle}>
                        Select Supplier
                    </Text>

                    <Searchbar
                        placeholder="Search Suppliers..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        autoCapitalize="none" 
                    />

                    <FlatList
                        data={filteredSuppliers}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        renderItem={({ item }) => (
                            <List.Item
                                key={item.id}
                                title={item.name}
                                description={item.address}
                                onPress={() => handleSupplierSelect(item)}
                                right={props => <List.Icon {...props} icon="chevron-right" />}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={() => (
                            <List.Item
                                title="Suppliers Loading..."
                                description="Please wait"
                            />
                        )}
                    />
                    <Button
                        mode="contained"
                        onPress={() => setShowSupplierModal(false)}
                        style={styles.modalCloseButton}
                    >
                        Close
                    </Button>
                </View>
            </Modal>
        </Portal>
        </>
    );

};

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
    },
    searchBar: {
        marginHorizontal: 16,
        marginBottom: 8,
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