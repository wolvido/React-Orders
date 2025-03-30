import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

interface SummaryPanelProps {
    total: number;
    quantity: number;
    onProceed: () => void;
}

export function SummaryPanel({ total, quantity, onProceed }: SummaryPanelProps) {
    return (
        <View style={styles.summaryContainer}>
            <Text variant="titleLarge" style={styles.total}>
                Total: ₱{total}
            </Text>
            <Text variant="titleLarge" style={styles.total}>
                Quantity: {quantity}
            </Text>
            <Button mode="contained" onPress={onProceed}>
                Proceed
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    summaryContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    total: {
        textAlign: 'right',
        fontSize: 20
    }
});