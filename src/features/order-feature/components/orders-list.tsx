import { DataTable, Searchbar, Button, List, Menu  } from 'react-native-paper';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { Order } from '@/src/entities/order/type/order';
import commonStyles from '@/src/shared/style/common';
import theme from '@/src/shared/style/theme';
import getPaymentStatusColor from '../../../shared/hooks/payment-status-color-hook';
import PaymentStatus from '@/src/shared/enums/payment-status';
import { useSearch } from '../../../shared/hooks/search-filter';
import { useState, useEffect } from 'react';

interface OrdersListProps {
    items: Order[];
    onPaymentClick: (id: number) => void;
    onUpdateOrder: (id: number) => void;
}

export const OrdersList = ({ items, onPaymentClick, onUpdateOrder }: OrdersListProps) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    // Add state to track which row's menu is open
    const [menuVisible, setMenuVisible] = useState<number | null>(null);

    // Toggle menu for a specific row
    const openMenu = (id: number) => setMenuVisible(id);
    const closeMenu = () => setMenuVisible(null);

    const searchableFields: (keyof Order)[] = [
        'orderType',
        'customer',
    ];

    const { searchQuery, setSearchQuery, filteredItems } = useSearch<Order>(
        items,
        searchableFields
    );

    //handles the state of table pagination
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 40, 60]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                <DataTable.Title style={{flexGrow: 3}}>Order Type</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Customer</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Payment Status</DataTable.Title>
                <DataTable.Title style={{flexGrow: 3}}>Total</DataTable.Title>
                {isPortrait && <DataTable.Title style={{flexGrow: 3}}>Actions</DataTable.Title>}
                {!isPortrait && <DataTable.Title style={{flexGrow: 4}}>Actions</DataTable.Title>}
            </DataTable.Header>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1 }}>
                    <DataTable>
                        {filteredItems.slice(from, to).map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.orderType}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.customer.name}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>{item.transactionDate.toLocaleDateString()}</DataTable.Cell>
                                <DataTable.Cell
                                    style={{flexGrow: 3}}
                                    textStyle={{color: getPaymentStatusColor(item.orderStatus)}}
                                >
                                    {item.orderStatus.toString()}
                                </DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 3}}>{`₱`+item.total}</DataTable.Cell>
                                
                                {isPortrait ? (
                                    <DataTable.Cell style={{flexGrow: 3}}>
                                        <Menu
                                            visible={menuVisible === item.id}
                                            onDismiss={closeMenu}
                                            anchor={
                                                <Button 
                                                    mode="contained"
                                                    icon="menu"
                                                    compact
                                                    style={{ backgroundColor: '#f2f2f2' }}
                                                    textColor="black"
                                                    onPress={() => openMenu(item.id)}
                                                >
                                                    Actions
                                                </Button>
                                            }
                                            style={{ marginTop: 40 }} // Adjust to position correctly
                                        >
                                            {item.orderStatus !== PaymentStatus.paid && (
                                                <Menu.Item 
                                                    onPress={() => {
                                                        closeMenu();
                                                        onPaymentClick(item.id);
                                                    }} 
                                                    title="Add Pay"
                                                    leadingIcon="cash-plus"
                                                />
                                            )}
                                            <Menu.Item 
                                                onPress={() => {
                                                    closeMenu();
                                                    onUpdateOrder(item.id);
                                                }} 
                                                title="Update" 
                                                leadingIcon="pencil"
                                            />
                                        </Menu>
                                    </DataTable.Cell>
                                ) : (
                                    <>
                                        <DataTable.Cell style={{flexGrow: 2}}>
                                            <Button 
                                                mode="contained" 
                                                onPress={() => onPaymentClick(item.id)}
                                                disabled={item.orderStatus === PaymentStatus.paid}
                                            >
                                                Add Pay
                                            </Button>
                                        </DataTable.Cell>   
                                        <DataTable.Cell style={{flexGrow: 2}}>
                                            <Button 
                                                mode="contained" 
                                                onPress={() => onUpdateOrder(item.id)}
                                            >
                                                Update
                                            </Button>
                                        </DataTable.Cell>
                                    </>
                                )}
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>

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
                    style={{
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        borderTopColor: '#e0e0e0'
                    }}
                />
            </View>
        </View>
    );
};
