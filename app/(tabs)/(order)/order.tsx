import { View, Text, Button,StyleSheet, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import commonStyles from '../../../style/common'
import { CartContext } from '../../../context/cart-context'; 
import { useContext } from 'react';
import { InventoryContext } from '@/context/inventory-context';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Cart } from '@/models/cart';

export default function OrderScreen() {

    //hook contexts
    const cartContext = useContext(CartContext);

    const router = useRouter();

    const { register, handleSubmit, control } = useForm<Cart>();

    //on submit
    const onSubmit: SubmitHandler<Cart> = (cart) => {

        const order: Cart = {
            id: 0,
            cartItems: cartContext.getItems(),
            cashier: cart.cashier,
            total: cart.total
        };

        cartContext.setOrder(order);
        router.push("/item-list");
    }

    return (
        <View style={styles.main}>   

            {/* <Button title="Submit Cart" onPress={handleSubmit} /> */}

            <Text style={commonStyles.title}>Order</Text>
            <View style={commonStyles.inputGroup}>
                <Text>Cashier:</Text>
                <Controller
                    name="cashier"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextInput
                            style = {commonStyles.input}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                    )}
                />
            </View>

            <Button title="Item List" onPress={handleSubmit(onSubmit)} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    list:{
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%'
    },
    item:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        borderStyle: 'solid',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 0
    
    },
    item__name:{
        fontSize: 20,
    },
});


