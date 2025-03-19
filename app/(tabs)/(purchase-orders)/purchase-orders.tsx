import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function PurchaseOrdersScreen() {
    return (
        <View style={styles.container}>
            <MaterialIcons name="construction" size={64} color="#666" />
            <Text style={styles.title}>Work in Progress</Text>
            <Text style={styles.subtitle}>
                Purchase Orders feature is currently under development, Thank you for your patience.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
});
