import { View, Text } from 'react-native';
import commonStyles from '@/style/common';
import { orders } from '@/dummy-data/dummy-orders';
import { products } from '@/dummy-data/dummy-products';
import * as React from 'react';
import { DataTable } from 'react-native-paper';

//react component
export default function ProductsScreen() {

        const [page, setPage] = React.useState<number>(0);
    
        const [numberOfItemsPerPageList] = React.useState([5, 6, 7, 8, 9, 10]);
    
        const [itemsPerPage, onItemsPerPageChange] = React.useState(
          numberOfItemsPerPageList[0]
        );
    
        const items = products;
      
        const from = page * itemsPerPage; 
        const to = Math.min((page + 1) * itemsPerPage, items.length);
      
        React.useEffect(() => {
          setPage(0);
        }, [itemsPerPage]);

    return (
        // <View style={commonStyles.main}>            

            
            <DataTable>
            <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Selling Price</DataTable.Title>
                <DataTable.Title numeric>Cost Price</DataTable.Title>
                <DataTable.Title numeric>Stocks</DataTable.Title>
                <DataTable.Title numeric>Units</DataTable.Title>
                <DataTable.Title numeric>Category</DataTable.Title>
                <DataTable.Title numeric>Brand</DataTable.Title>

            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.sellingPrice}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.costPrice}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.stocks}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.units}</DataTable.Cell>
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
            />

        </DataTable>
        // </View>
    );
}