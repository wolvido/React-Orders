import { View, Text } from 'react-native';
import commonStyles from '@/style/common';
import * as React from 'react';
import { DataTable, ToggleButton } from 'react-native-paper';
import { purchaseOrders } from '@/dummy-data/dummy-purchase-orders';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import theme from '@/style/theme';

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
                <DataTable.Title>PO number</DataTable.Title>
                <DataTable.Title>Delivery Status</DataTable.Title>
                <DataTable.Title>Controls</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
            <DataTable.Row style={styles.table__row} key={item.key}>
                <DataTable.Cell>{item.key}</DataTable.Cell>
                <DataTable.Cell>{item.deliveryStatus}</DataTable.Cell>
                <DataTable.Cell style={styles.buttonGroupCell}>
                    <ToggleButton.Row style={styles.buttonGroup} onValueChange={value => setValue(value)} value={value}>
                        <Button style={styles.button} compact buttonColor="#70ff81" icon="" mode="contained-tonal" onPress={() => console.log('Deliver Received')}>
                            Receive Delivery
                        </Button>
                        <Button style={styles.button} compact buttonColor="#FF8488" icon="" mode="contained-tonal" onPress={() => console.log('Delivery Cancelled')}>
                            Cancel Delivery
                        </Button>
                    </ToggleButton.Row>
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