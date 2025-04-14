import { PurchaseOrderLine } from "@/src/entities/purchase-order-line/type/purchase-order-line";
import { ScrollView, StyleSheet, View } from "react-native";
import { DataTable, IconButton, Text } from "react-native-paper";

interface PurchaseOrderLineListProps {
    poItems: PurchaseOrderLine[];
    isVisible?: boolean;
    onDismiss?: () => void;
}

export default function PurchaseOrderLineList({ poItems, isVisible, onDismiss }: PurchaseOrderLineListProps) {

    if (!isVisible) {
        return null;
    }

    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>

            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Purchase Order Details</Text>
                    <IconButton
                        iconColor="white"
                        icon="close"
                        onPress={onDismiss}
                        size={24}
                    />
                </View>
            </View>

            <DataTable.Header>
                <DataTable.Title>Item</DataTable.Title>
                <DataTable.Title>Received Quantity</DataTable.Title>
                <DataTable.Title>Units</DataTable.Title>
                <DataTable.Title>Unit Price</DataTable.Title>
                <DataTable.Title>Ordered Quantity</DataTable.Title>
                <DataTable.Title>SubTotal</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1 }}>
                    {poItems.map((item) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{item.product?.name}</DataTable.Cell>
                            <DataTable.Cell>{item.receivedQuantity}</DataTable.Cell>
                            <DataTable.Cell>{item.product?.unitType}</DataTable.Cell>
                            <DataTable.Cell>{item.basePrice}</DataTable.Cell>
                            <DataTable.Cell>{item.orderedQuantity}</DataTable.Cell>
                            <DataTable.Cell>{item.totalPrice}</DataTable.Cell>
                            <DataTable.Cell>{item.isProcessed ? 'Received' : 'Incomplete'}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'rgb(15, 119, 107)',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
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