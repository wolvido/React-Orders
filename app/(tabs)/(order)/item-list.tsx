import { View, Text, Button,StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../style/common'
import { CartContext } from '../../../context/cart-context'; 
import { useContext } from 'react';
import { InventoryContext } from '@/context/inventory-context';
import { useForm, Controller } from "react-hook-form"
import { CartItem } from '@/models/cart-item';

export default function OrderScreen() {

    //hook contexts
    const cartContext = useContext(CartContext);
    const inventoryContext = useContext(InventoryContext);

    //grab available items from inventory
    const inventoryItems = inventoryContext.getAllInventory();

    const { control, getValues } = useForm();

    return (
        <View style={commonStyles.main}>   

            <Text style={commonStyles.title}>Cart Items</Text>

            <View style={commonStyles.tableHeader}>
                <Text style={commonStyles.header}>Name</Text>
                <Text style={commonStyles.header}>Description</Text>
                <Text style={commonStyles.header}>Price</Text>
                <Text style={commonStyles.header}>Quantity</Text>
                <Text style={commonStyles.header}>Add to Cart</Text>

            </View>

            <View style={commonStyles.list}>
                {inventoryItems.map((inventory) => (
                    <View key={`${inventory.id}-${Math.random()}`} style={commonStyles.item}>
                        <Text style={commonStyles.item__name}>
                            {inventory.item.name}
                        </Text>

                        <Text>
                            {inventory.item.description}
                        </Text>

                        <Text>
                            {inventory.item.price}
                        </Text>

                        <Controller
                            name={`quantity-${inventory.id}`}
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
                        
                        <Button title="Add to Cart" onPress={() => {
                            const quantity = getValues(`quantity-${inventory.id}`);

                            const cartItem: CartItem = {
                                id: Math.random(),
                                item: inventory.item,
                                quantity: quantity,
                                total: inventory.item.price * quantity
                            };

                            // console.log("onPress:");
                            // console.log(cartItem);

                            cartContext.addItemsByQuantity(cartItem);
                        }} />
                    </View>
                ))}
            </View>

            {/* <Button title="Submit Cart" onPress={handleSubmit} /> */}

            <Link style={commonStyles.button} href="/cart">Checkout</Link>
            
        </View>
    );
}