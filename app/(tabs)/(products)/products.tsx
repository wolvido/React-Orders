import commonStyles from '@/style/common';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Text, ActivityIndicator, DataTable, Searchbar, Surface } from 'react-native-paper';
import theme from '@/style/theme';
import { useEffect, useState } from 'react';
import { Product } from '@/entities/product';
import { useSearch } from '@/hooks/search-filter';
import { EmptyState } from '@/components/empty-state';
import { ProductRepository } from '@/repositories/product-repository';

//react component
export default function ProductsScreen() {
        const [page, setPage] = useState<number>(0);
        const [numberOfItemsPerPageList] = useState([10, 25, 50, 100]);
        const [itemsPerPage, onItemsPerPageChange] = useState(
            numberOfItemsPerPageList[0]
        );

        const [itemsLoaded, setItemsLoaded] = useState(10);

        const [items, setItems] = useState<Product[]>([]);
        const productRepository = new ProductRepository();

        useEffect(() => {
            const currentLastItem = (page + 1) * itemsPerPage;
            // If close to the end of loaded items, load more
            if (currentLastItem >= itemsLoaded) {
                productRepository.getProductPerPage(1, itemsLoaded * 2).then((data) => {
                    setItems(data);
                    setItemsLoaded(itemsLoaded * 2);
                });
            }
        }, [page, itemsPerPage]);
    
        //const items = products;

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
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
                <DataTable.Title numeric>Price</DataTable.Title>
                <DataTable.Title numeric>Stocks</DataTable.Title>
                <DataTable.Title numeric>Unit Type</DataTable.Title>
                <DataTable.Title numeric>Category</DataTable.Title>
                <DataTable.Title numeric>Brand</DataTable.Title>
                {/* <DataTable.Title numeric>Bundle Quantity</DataTable.Title>
                <DataTable.Title numeric>Bundle Type</DataTable.Title> */}

            </DataTable.Header>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1 }}>
                    <DataTable>

                        {filteredItems.slice(from, to).map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell style={{ flex: 2 }} >{item.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.stocks}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.unitType}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.category}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.brand}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>

            {/* the table controller */}
            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(newPage) => {
                    setPage(newPage);
                }}
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