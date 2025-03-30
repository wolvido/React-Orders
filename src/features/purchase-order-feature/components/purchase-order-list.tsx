import { PurchaseOrder } from "@/src/entities/purchase-order/type/purchase-order";
import { useWindowDimensions, View, StyleSheet, ScrollView } from "react-native";
import { useSearch } from "@/src/shared/hooks/search-filter";
import { DataTable, Menu, Searchbar, Button } from "react-native-paper";
import theme from "@/src/shared/style/theme";
import { useEffect, useState } from "react";

interface PurchaseOrderListProps {
    poItems: PurchaseOrder[];
    onReceivePo: (id: number) => void;
    onViewDetails?: (id: number) => void;
}

export default function PurchaseOrderList(  { poItems, onReceivePo, onViewDetails }: PurchaseOrderListProps) {
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    // Add state to track which row's menu is open
    const [menuVisible, setMenuVisible] = useState<number | null>(null);

    // Toggle menu for a specific row
    const openMenu = (id: number) => setMenuVisible(id);
    const closeMenu = () => setMenuVisible(null);
    
    const searchableFields: (keyof PurchaseOrder)[] = [
        'supplier',
        'preparedBy',
    ];

    const { searchQuery, setSearchQuery, filteredItems } = useSearch<PurchaseOrder>(
        poItems,
        searchableFields
    );

    //handles the state of table pagination
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 40, 60]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, poItems.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <DataTable.Header style={styles.extraHeader}>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    mode='view'
                    style={styles.searchBar}
                    inputStyle={styles.searchBar}
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
                <DataTable.Title style={{flexGrow: 1}}>Supplier</DataTable.Title>
                <DataTable.Title style={{flexGrow: 1}}>Transaction Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 1}}>Expected Del. Date</DataTable.Title>
                <DataTable.Title style={{flexGrow: 1}}>Prepared By</DataTable.Title>
                <DataTable.Title style={{flexGrow: 1}}>Status</DataTable.Title>
                <DataTable.Title style={{flexGrow: 1}}>Remarks</DataTable.Title>
                {isPortrait && <DataTable.Title style={{flexGrow: 3}}>Actions</DataTable.Title>}
                {!isPortrait && <DataTable.Title style={{flexGrow: 4}}>Actions</DataTable.Title>}
            </DataTable.Header>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1 }}>
                    <DataTable>
                        {filteredItems.slice(from, to).map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.supplier?.name}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.transactionDate.toDateString()}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.expectedDeliveryDate.toDateString()}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.preparedBy}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.isComplete ? 'Received' : 'Pending'}</DataTable.Cell>
                                <DataTable.Cell style={{flexGrow: 1}}>{item.remarks}</DataTable.Cell>
                                {
                                    isPortrait ?
                                    (
                                        <DataTable.Cell style={{flexGrow: 1}}>
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
                                                {!item.isComplete && (
                                                    <Menu.Item 
                                                        onPress={() => onReceivePo(item.id)} 
                                                        title="Receive"
                                                        leadingIcon="check"
                                                    />
                                                )}

                                                {onViewDetails && (
                                                    <Menu.Item 
                                                        onPress={() => onViewDetails(item.id)} 
                                                        title="View Details"
                                                        leadingIcon="eye"
                                                    />
                                                )}
                                                
                                            </Menu>
                                        </DataTable.Cell>
                                    ) : (
                                        <>
                                            <DataTable.Cell style={{flexGrow: 1}}>
                                                <Button
                                                    mode='contained'
                                                    onPress={() => onReceivePo(item.id)}
                                                    disabled={item.isComplete}
                                                >
                                                    Receive
                                                </Button>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{flexGrow: 2}}>
                                            {onViewDetails && (
                                                <Button
                                                    mode='contained'
                                                    onPress={() => onViewDetails(item.id)}
                                                >
                                                    View Details
                                                </Button>
                                            )}
                                            </DataTable.Cell>
                                        </>
                                    )
                                }
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(poItems.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${poItems.length}`}
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
}

const styles = StyleSheet.create({
    extraHeader:
    {
        minHeight: 0,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: ' #eae7e6',
    },
    searchBar:
    {
        minHeight: 0,
        height: 38,
        width: '40%',
    }
});