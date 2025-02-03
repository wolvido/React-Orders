import { View, Text } from 'react-native';
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

export default function PurchaseOrdersScreen() {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([5, 6, 7, 8, 9, 10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const items = purchaseOrders;

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const [searchQuery, setSearchQuery] = useState('');

    const handleReceiveOrder = (order: PurchaseOrder) => {
        console.log('Receiving order:', order);
        router.push('./receive-order');
    };

    return (
        <DataTable>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search"
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
                <DataTable.Title style={{ flexGrow: 1 }}>ID</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Supplier</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Expected Del. Date</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 2 }}>Expected Total</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Prepared By</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Status</DataTable.Title>
                <DataTable.Title style={{ flexGrow: 3 }}>Action</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row style={styles.table__row} key={item.id}>
                    <DataTable.Cell style={{ flexGrow: 1 }}>{item.id}</DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 3 }}>{item.delivery.supplier.name}</DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 3 }}>{item.transactionDate.toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 3 }}>{item.delivery.deliveryDate.toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 2 }}>{item.delivery.total}</DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 3 }}>{item.preparedBy}</DataTable.Cell>
                    <DataTable.Cell
                        style={{ flexGrow: 3 }}
                        textStyle={{
                            color: getStatusColor(item.status)
                        }}>
                        {item.status}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flexGrow: 3 }}>
                        <Button 
                            mode="contained" 
                            onPress={() => handleReceiveOrder(item)}
                            style={[
                                styles.receiveButton,
                                item.status.toLowerCase() === 'cancelled' && styles.cancelledButton
                            ]}
                            disabled={item.status.toLowerCase() === 'cancelled'  || item.status.toLowerCase() === 'fulfilled'}
                        >
                            Receive
                        </Button>
                    </DataTable.Cell>
                </DataTable.Row>
            ))}

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
        </DataTable>
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
    }
});
