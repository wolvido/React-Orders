import { View, Text } from 'react-native';
import commonStyles from '@/style/common';

import theme from '@/style/theme';

import * as React from 'react';
import { DataTable, Searchbar } from 'react-native-paper';

import { orders } from '@/dummy-data/dummy-orders';

//react component
export default function OrdersScreen() {
    //handles the state of table pagination
    const [page, setPage] = React.useState<number>(0);

    //stores the initial selection for the number of items per page
    const [numberOfItemsPerPageList] = React.useState([5, 6, 7, 8, 9, 10]);
        //used for the dropdown menu to display the possible options

    //switches the page options
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );

    const items = orders;
  
    //calculates the range of items per page in display
    //whenever the page changes, it calculates from what index of the array the currect state is
    const from = page * itemsPerPage; 
    //calculates the end of the range
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    //resets the page to the start item range changes, 
    // so that it doesnt break when page doesnt exist
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
        //sometimes a page wont exist when you expand the number of items per page

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
                <DataTable.Title>Customer</DataTable.Title>
                <DataTable.Title numeric>Fulfillment Status</DataTable.Title>
                <DataTable.Title numeric>Handled By</DataTable.Title>
                <DataTable.Title numeric>Payment Status</DataTable.Title>
                <DataTable.Title numeric>Transaction Date</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.customer}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.fulfillmentStatus}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.handledby}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.paymentStatus}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.transactionDate}</DataTable.Cell>
                </DataTable.Row>
            ))}

            {/* the table controller */}
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