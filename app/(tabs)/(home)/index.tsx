import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Link } from 'expo-router';
//import { useInput } from '../../hooks/index-hook'; // Import the custom hook
import { CartContext } from '../../../context/cart-context'; 
import { useContext } from 'react';

//react component
export default function HomeScreen() {

    const cartContext = useContext(CartContext);
    //dummy items
    const item1 = { id: 1, name: "Item 1", description: "Description for Item 1" };
    const item2 = { id: 2, name: "Item 2", description: "Description for Item 2" };
    const item3 = { id: 3, name: "Item 3", description: "Description for Item 3" };

    const items = [item1, item2, item3];

    return (
        <View style={styles.main}>            

            <Text>Home</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
