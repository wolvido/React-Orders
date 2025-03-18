import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Portal, Modal, List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { ProductSchema } from '../../../../entities/product-schema';

interface ProductSchemaSelectionProps {
    schemas: ProductSchema[];
    onSchemaSelect: (schema: ProductSchema) => void;
    defaultSchema?: ProductSchema;
}

export default function ProductSchemaSelection({ schemas, onSchemaSelect, defaultSchema }: ProductSchemaSelectionProps) {
    const [visibleSchemas, setVisibleSchemas] = React.useState(false);
    const [selectedSchema, setSelectedSchema] = React.useState<ProductSchema | null>(defaultSchema || null);
    
    const showSchemaModal = () => setVisibleSchemas(true);
    const hideSchemaModal = () => setVisibleSchemas(false);
    
    const handleSchemaSelect = (schema: ProductSchema) => {
        setSelectedSchema(schema);
        onSchemaSelect(schema);
        hideSchemaModal();
    };

    return (
        <>
            <View style={styles.schemaInputContainer}>
                {selectedSchema && (
                    <Text style={styles.schemaLabel}>
                        Product Schema
                    </Text>
                )}
                <Button
                    mode="outlined"
                    onPress={showSchemaModal}
                    style={styles.schemaButton}
                    contentStyle={styles.schemaButtonContent}
                    icon="file-document-outline"
                >
                    <Text style={[
                        styles.schemaButtonText,
                        !selectedSchema && styles.schemaButtonPlaceholder
                    ]}>
                        {selectedSchema ? selectedSchema.description : 'Select Product Pricing Schema'}
                    </Text>
                </Button>
            </View>

            <Portal>
                <Modal
                    visible={visibleSchemas}
                    onDismiss={hideSchemaModal}
                    contentContainerStyle={styles.modalContainer}
                >
                    <ScrollView>
                        <List.Section>
                            <List.Subheader>Select Product Schema</List.Subheader>
                            {schemas.map((schema) => (
                                <List.Item
                                    key={schema.id}
                                    title={schema.description}
                                    left={props => <List.Icon {...props} icon="file-document" />}
                                    onPress={() => handleSchemaSelect(schema)}
                                />
                            ))}
                        </List.Section>
                    </ScrollView>
                </Modal>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    schemaInputContainer: {
        position: 'relative',
    },
    schemaLabel: {
        position: 'absolute',
        top: -8,
        left: 12,
        fontSize: 12,
        color: '#000000',
        backgroundColor: 'white',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    schemaButton: {
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    schemaButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: '100%',
    },
    schemaButtonText: {
        textAlign: 'left',
        flex: 1,
        color: '#000000',
        fontSize: 16,
    },
    schemaButtonPlaceholder: {
        color: '#666666',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        maxHeight: '80%',
        borderRadius: 8,
    },
});
