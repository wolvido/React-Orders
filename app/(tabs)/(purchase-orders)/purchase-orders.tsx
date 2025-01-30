import { View, Text } from 'react-native';
import commonStyles from '@/style/common';
import * as React from 'react';
import { DataTable, ToggleButton } from 'react-native-paper';
import { purchaseOrders } from '@/dummy-data/dummy-purchase-orders';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import theme from '@/style/theme';
import getStatusColor from '@/hooks/status-color-hook';

//react component
export default function PurchaseOrdersScreen() {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([5, 6, 7, 8, 9, 10]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );

    const items = purchaseOrders;

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    const [value, setValue] = React.useState('left');

    const [searchQuery, setSearchQuery] = React.useState('');



    return (
    // <View style={commonStyles.main}>            
        <DataTable>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    mode='view'
                    style = {commonStyles.searchBar}
                    inputStyle = {commonStyles.searchBar}
                    theme={{
                        colors: {
                            elevation: {
                                level3: theme.colors.accent,  // This changes the inner background
                            },
                        },
                    }}
                />
            </DataTable.Header>

            <DataTable.Header>
                <DataTable.Title style={{flexGrow: 1}}>ID</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Supplier</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Expected Del. Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Expected Total</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Prepared By</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Status</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Remarks</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
            <DataTable.Row style={styles.table__row} key={item.key}>
                <DataTable.Cell style={{flexGrow: 1}}>{item.key}</DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.supplier}</DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.transactionDate}</DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.deliveryDate}</DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.total}</DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.preparedBy}</DataTable.Cell>
                <DataTable.Cell 
                style={{flexGrow: 3,}} 
                textStyle = {
                    {color: getStatusColor(item.status)}
                }>
                    {item.status}
                </DataTable.Cell>
                <DataTable.Cell style={{flexGrow: 3}}>{item.remarks}</DataTable.Cell>
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
            
    // </View>
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
    }
  });