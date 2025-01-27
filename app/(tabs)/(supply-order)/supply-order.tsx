import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SupplyOrderContext } from '@/context/supply-order-context';
import { SupplyOrder } from '@/models/supply-order';
import { useContext } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form"
import commonStyles from '@/style/common';
import { InventoryContext } from '@/context/inventory-context';
import { Inventory } from '@/models/inventory';

export default function SupplyOrderScreen() {

    const supplyOrderContext = useContext(SupplyOrderContext);
    const inventoryContext = useContext(InventoryContext);

    const { register, handleSubmit, control, getValues } = useForm<SupplyOrder>();

    const inventoryItems = inventoryContext.getAllInventory();

    const onSubmit: SubmitHandler<SupplyOrder> = () => {
        supplyOrderContext.handleSubmit();
    }

    return (
        <View style={commonStyles.main}>
            <View style={commonStyles.list}>
                {inventoryItems.map((inventory) => (
                    <View key={`${inventory.item.id}-${Math.random()}`} style={commonStyles.item}>
                        <Text style={commonStyles.item__name}>
                            {inventory.item.name}
                        </Text>

                        <Text>
                            {inventory.item.description}
                        </Text>

                        <Controller
                            name={`supplyOrderItems.${inventory.item.id}.quantity`}
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                                <TextInput
                                    style = {commonStyles.input}
                                    keyboardType="numeric"
                                    value={field.value.toString()}
                                    onChangeText={field.onChange}
                                />
                            )}
                        />

                        <Button title="Add to Supply Order" onPress={() => {
                            const quantity = getValues(`supplyOrderItems.${inventory.item.id}.quantity`);

                            const supplyOrderItem: Inventory = {
                                id: Math.random(),
                                item: inventory.item,
                                quantity: quantity
                            };

                            supplyOrderContext.addInventoryByQuantity(supplyOrderItem);
                        }} />
                    </View>
                ))}
            </View>

            <Button title="Submit Supply Order" onPress={handleSubmit(onSubmit)} />

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