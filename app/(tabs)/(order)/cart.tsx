import { CartContext } from '../../../context/cart-context'; 
import { View, Text, StyleSheet, Button } from 'react-native';
import { CartItem } from '@/models/cart-item';
import { useContext } from 'react';
import common from '@/style/common';

export default function CartScreen() {

    //hook cart-context
    const cartContext = useContext(CartContext);

    const items = cartContext.getItems();

    return (
        <View style={styles.main}>
            <Text style={common.title}>Order</Text>

            <View style={styles.list}>
                {items.map((cartItem: CartItem) => (
                    <View key={`${cartItem.id}-${Math.random()}`} style={styles.item}>
                        <Text style={styles.item__name}>
                            {cartItem.item.name}
                        </Text>

                        <Text>
                            {cartItem.quantity}
                        </Text>

                        <Text>
                            {cartItem.item.description}
                        </Text>

                        <Text>
                            {cartItem.total}
                        </Text>
                    </View>
                ))}
            </View>

            <Button title="Submit Cart" onPress={cartContext.handleSubmit} />

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
    button:{
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 5,
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