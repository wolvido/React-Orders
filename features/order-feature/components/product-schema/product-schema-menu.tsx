import { ProductSchema } from "@/features/order-feature/types/product-schema";
import theme from "@/style/theme";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, TouchableRipple, Text, IconButton, Surface, Chip } from "react-native-paper";

interface SchemaMenuProps {
    schemas: ProductSchema[];
    onSchemaSelect: (schema: ProductSchema) => void;
}

export function ProductSchemaMenu({
    schemas,
    onSchemaSelect
}: SchemaMenuProps) {

    const defaultSchema = {
        id: 0,
        description: 'Default Pricing Schema',
        type: 'Default',
        selectionType: 'All',
        modifyingValue: 0,
    } as ProductSchema;

    const [selectedSchema, setSelectedSchema] = useState<ProductSchema>(defaultSchema);
    const [schemaMenuVisible, setSchemaMenuVisible] = useState(false);

    const handleSchemaSelect = (schema: ProductSchema) => {
        console.log('schema selected:', schema);
        setSelectedSchema(schema);
        onSchemaSelect(schema);
        setSchemaMenuVisible(false);
    };

    return (
        <Surface 
            style={styles.container}
            mode={'elevated'}
            elevation={5}
        >
            <Menu
                mode = {'flat'}
                style={styles.container}
                visible={schemaMenuVisible}
                onDismiss={() => setSchemaMenuVisible(false)}
                anchor={
                    <TouchableRipple onPress={() => setSchemaMenuVisible(true)}>
                        <View style={styles.schemaSelector}>
                            <View style={styles.schemaInfo}>
                                <Text variant="titleMedium" style={styles.schemaTitle}>
                                    {"Pricing Schema: "+selectedSchema?.description}
                                </Text>
                                <View style={styles.schemaDetails}>
                                    <Chip 
                                        compact 
                                        mode="outlined" 
                                        style={styles.chip}
                                    >
                                        {selectedSchema?.type}
                                    </Chip>
                                    <Chip
                                        compact 
                                        mode="outlined" 
                                        style={styles.chip}
                                    >
                                        {selectedSchema?.selectionType}
                                    </Chip>
                                    {selectedSchema?.modifyingValue !== 0 && (
                                        <Chip
                                            compact 
                                            mode="outlined" 
                                            style={styles.chip}
                                        >
                                            
                                            {(selectedSchema?.type == "Percentage") && selectedSchema?.modifyingValue+'%'}
                                            {(selectedSchema?.type == "Fixed") && '₱'+selectedSchema?.modifyingValue}

                                        </Chip>
                                    )}
                                </View>
                            </View>
                            <IconButton 
                                icon="chevron-down" 
                                size={24}
                                style={styles.iconButton}
                            />
                        </View>
                    </TouchableRipple>
                }>
                    {schemas.map((schema) => (
                        <Menu.Item
                            key={schema.id}
                            onPress={() => handleSchemaSelect(schema)}
                            title={schema.description}
                            leadingIcon={schema.modifyingValue > 0 ? 'tag-plus' : 'tag-minus'}
                        />
                    ))}
            </Menu>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 8,
    },
    label: {
        paddingHorizontal: 16,
        paddingTop: 12,
        color: theme.colors.primary,
    },
    schemaSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.surface,
        marginBottom: 8,
        elevation: 2,
    },
    schemaInfo: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'white',
    },
    schemaTitle: {
        marginBottom: 4,
    },
    schemaDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        height: 29,
    },
    iconButton: {
        margin: 0,
    }
});