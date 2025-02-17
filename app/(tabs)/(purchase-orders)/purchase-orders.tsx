import { View, Text, ScrollView } from 'react-native';
import commonStyles from '@/style/common';
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { purchaseOrders } from '@/dummy-data/dummy-purchase-orders';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import theme from '@/style/theme';
import getStatusColor from '@/hooks/status-color-hook';
import { useEffect, useState } from 'react';
import { PurchaseOrder } from '@/entities/purchase-order';
import { router } from "expo-router";
import { usePurchaseOrder } from '@/context/purchase-order-context';
import { useSearch } from '@/hooks/search-filter';
import { EmptyState } from '@/components/empty-state';

export default function PurchaseOrdersScreen() {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 40, 60]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const { initializePurchaseOrder } = usePurchaseOrder();

    const items = purchaseOrders;

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const handleReceiveOrder = (order: PurchaseOrder) => {
        initializePurchaseOrder(order);
        router.push('./receive-order');
    };

    //search
    const searchableFields = [
        'delivery.supplier.name',
        'preparedBy',
    ];
    const { searchQuery, setSearchQuery, filteredItems } = useSearch<PurchaseOrder>(
        items,
        searchableFields
    );

    if (items.length === 0) {
        return (
            <View>
                <EmptyState
                    title="Awaiting Data..."
                    subtitle="No purchase orders available at the moment"
                    loading={true}
                />
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    mode='view'
                    style={commonStyles.searchBar}
                    inputStyle={commonStyles.searchBar}
                    theme={{
                        colors: {
                            elevation: {
                                level3: theme.colors.accent,
                            },
                        },
                    }}
                />
            </DataTable.Header>

            <DataTable.Header>
                <DataTable.Title style={{ flexGrow: 3 }}>Supplier</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Expected Del. Date</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 2 }}>Expected Total</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 4 }}>Prepared By</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Status</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 4 }}>Action</DataTable.Title>
            </DataTable.Header>

            <View style={styles.tableContainer}>
                <ScrollView>
                    <DataTable>
                        {filteredItems.slice(from, to).map((item) => (
                            <DataTable.Row style={styles.table__row} key={item.id}>
                                <DataTable.Cell style={{ flexGrow: 3 }}>{item.delivery.supplier.name}</DataTable.Cell>
                                <DataTable.Cell style={{ flexGrow: 3 }}>{item.transactionDate.toLocaleDateString()}</DataTable.Cell>
                                <DataTable.Cell style={{ flexGrow: 3 }}>{item.delivery.deliveryDate.toLocaleDateString()}</DataTable.Cell>
                                <DataTable.Cell style={{ flexGrow: 2 }}>{item.delivery.total}</DataTable.Cell>
                                <DataTable.Cell style={{ flexGrow: 4 }}>{item.preparedBy}</DataTable.Cell>
                                <DataTable.Cell
                                    style={{ flexGrow: 3 }}
                                    textStyle={{
                                        color: getStatusColor(item.status)
                                    }}>
                                    {item.status}
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flexGrow: 4 }}>
                                    <Button 
                                        mode="contained" 
                                        onPress={() => handleReceiveOrder(item)}
                                        style={[
                                            styles.receiveButton,
                                            item.status.toLowerCase() === 'cancelled' && styles.cancelledButton
                                        ]}
                                        disabled={item.status.toLowerCase() === 'cancelled'  || item.status.toLowerCase() === 'fulfilled'}
                                    >
                                        Receive PO
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>
            </View>

            <View style={styles.paginationContainer}>
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                    dropdownItemRippleColor={'white'}
                    theme={{
                        colors: {
                            elevation: {
                                level2: theme.colors.accent,
                            },
                            primary: 'black',
                        },
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 40
    },
    table__row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-evenly',
        width: '100%'
    },
    buttonGroupCell: {
        display: 'flex',
        width: '100%'
    },
    receiveButton: {
        marginHorizontal: 5,
        paddingHorizontal: 8,
        height: 35,
        justifyContent: 'center'
    },
    cancelledButton: {
        backgroundColor: '#cccccc',  // grey color for cancelled items
        opacity: 0.7
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    tableContainer: {
        flex: 1,
        flexGrow: 1,
    },
    paginationContainer: {
        width: '100%',
        backgroundColor: 'white', // Or match your theme
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0', // Optional - adds a subtle separator
    },
});
