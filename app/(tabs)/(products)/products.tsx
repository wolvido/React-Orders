import commonStyles from '@/style/common';
import { StyleSheet, View } from 'react-native';
import { products } from '@/dummy-data/dummy-products';
import * as React from 'react';
import { Text, ActivityIndicator, DataTable, Searchbar, Surface } from 'react-native-paper';
import theme from '@/style/theme';
import { useEffect, useState } from 'react';
import { Product } from '@/entities/product';
import { useSearch } from '@/hooks/search-filter';
import { EmptyState } from '@/components/empty-state';

//react component
export default function ProductsScreen() {

        const [page, setPage] = useState<number>(0);
    
        const [numberOfItemsPerPageList] = useState([7, 8, 9, 10, 11, 12]);
    
        const [itemsPerPage, onItemsPerPageChange] = useState(
          numberOfItemsPerPageList[0]
        );
    
        const items = products;
      
        const from = page * itemsPerPage; 
        const to = Math.min((page + 1) * itemsPerPage, items.length);
      
        useEffect(() => {
          setPage(0);
        }, [itemsPerPage]);


        //search
        const searchableFields: (keyof Product)[] = [
            'name'
        ];
        const { searchQuery, setSearchQuery, filteredItems } = useSearch<Product>(
            items,
            searchableFields
        );

    if (items.length === 0) {
        return (
            <View>
                <EmptyState
                    title="Awaiting shipment..."
                    subtitle="No products available at the moment"
                />
            </View>

        );
    }

    return (
        // <View style={commonStyles.main}>            
        <DataTable>
            <DataTable.Header style={commonStyles.extraHeader}>
                <Searchbar
                    placeholder="Search..."
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
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Selling Price</DataTable.Title>
                <DataTable.Title numeric>Cost Price</DataTable.Title>
                <DataTable.Title numeric>Stocks</DataTable.Title>
                <DataTable.Title numeric>Unit Type</DataTable.Title>
                <DataTable.Title numeric>Category</DataTable.Title>
                <DataTable.Title numeric>Brand</DataTable.Title>

            </DataTable.Header>

            {filteredItems.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.sellingPrice}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.costPrice}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.stocks}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.unitType}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.category}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.brand}</DataTable.Cell>

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

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    emptyText: {
        marginTop: 16,
        color: theme.colors.primary,
        textAlign: 'center',
    },
    emptySubtext: {
        marginTop: 8,
        color: theme.colors.secondary,
        textAlign: 'center',
        opacity: 0.8,
    },
    spinner: {
        marginBottom: 16,
    },
});