import { ProductSchema } from "@/entities/product-schema";
import theme from "@/style/theme";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, TouchableRipple, Text, IconButton } from "react-native-paper";

interface SchemaMenuProps {
    schemas: ProductSchema[];
    onSchemaSelect: (schema: ProductSchema) => void;
}

export function ProductSchemaMenu({
    schemas,
    onSchemaSelect
}: SchemaMenuProps) {

    const [selectedSchema, setSelectedSchema] = useState<ProductSchema>();
    const [schemaMenuVisible, setSchemaMenuVisible] = useState(false);

    const handleSchemaSelect = (schema: ProductSchema) => {
        console.log('schema selected:', schema);
        setSelectedSchema(schema);
        onSchemaSelect(schema);
        setSchemaMenuVisible(false);
    };

    return (
        <Menu
            visible={schemaMenuVisible}
            onDismiss={() => setSchemaMenuVisible(false)}
            anchor={
                <TouchableRipple onPress={() => setSchemaMenuVisible(true)}>
                    <View style={styles.schemaSelector}>
                        <Text>{selectedSchema?.description}</Text>
                        <IconButton icon="chevron-down" size={20} />
                    </View>
                </TouchableRipple>
            }>
                {schemas.map((schema) => (
                    <Menu.Item 
                        key={schema.id}
                        onPress={() => handleSchemaSelect(schema)}
                        title={schema.description}
                    />
                ))}
        </Menu>
    );
}

const styles = StyleSheet.create({
    schemaSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.surface,
        marginBottom: 8,
        elevation: 2,
    },
});