//DO NO USE RADIO, DO NOT USE THIS

import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';
import { Text, Modal, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function TransactionTypeSelector(){
    const [groupValue, setGroupValue] = useState('');
    const [visible, setVisible] = useState(false);

    const handleValueChange = (value: string) => {
        setGroupValue(value);
        setVisible(true);
    };

    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    // Function to render the appropriate modal content
    const getModalContent = () => {
        switch(groupValue) {
            case 'first':
                return <Text>Cash Modal Content</Text>;
            case 'second':
                return <Text>Cheque Modal Content</Text>;
            case 'third':
                return <Text>Bank Transfer Modal Content</Text>;
            case 'fourth':
                return <Text>Payment Gateway Modal Content</Text>;
            default:
                return <Text>Select a payment method</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.topLeftLabel}>Payment Method</Text>
            <RadioButton.Group
                onValueChange={handleValueChange}
                value={groupValue}
            >
                <View style={styles.group}>
                    <View style={styles.radioGroup}>
                        <RadioButton value="first" />
                        <Text variant="labelLarge">Cash</Text>
                    </View>

                    <View style={styles.radioGroup}>
                        <RadioButton value="second" />
                        <Text variant="labelLarge">Cheque</Text>
                    </View>

                    <View style={styles.radioGroup}>
                        <RadioButton value="third" />
                        <Text variant="labelLarge">Bank Transfer</Text>
                    </View>

                    <View style={styles.radioGroup}>
                        <RadioButton value="fourth" />
                        <Text variant="labelLarge">Payment Gateway</Text>
                    </View>
                </View>
            </RadioButton.Group>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    {getModalContent()}
                    

                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    group: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 2,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 100,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    topLeftLabel: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 18,
        color: '#666',
        zIndex: 1,
        fontWeight: 'bold'
    },
});

export default TransactionTypeSelector;
