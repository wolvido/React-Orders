import { View, Text, StyleSheet, Button } from 'react-native';
import commonStyles from '../../../style/common';
import { InventoryContext } from '@/context/inventory-context';
import { useContext } from 'react';
import { Link } from 'expo-router';

export default function InventoryScreen() {

    const inventoryContext = useContext(InventoryContext);

    const inventoryItems = inventoryContext.getAllInventory();

    return (
        <View style={commonStyles.main}>
            <Text style={commonStyles.title}>Inventory</Text>

            <View style={commonStyles.tableHeader}>
                <Text style={commonStyles.header}>Name</Text>
                <Text style={commonStyles.header}>Description</Text>
                <Text style={commonStyles.header}>Quantity</Text>
            </View>

            <View style={commonStyles.list}>
            {inventoryItems.map((inventory) => (
                <View key={inventory.id} style={commonStyles.item}>
                    <Text style={commonStyles.item__name}>
                        {inventory.item.name}
                    </Text>
                    <Text>
                        {inventory.item.description}
                    </Text>
                    <Text>
                        quantity: {inventory.quantity}
                    </Text>
                </View>
            ))}
            </View>

            <Link style={commonStyles.button} href="/create-item">Create Item</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});