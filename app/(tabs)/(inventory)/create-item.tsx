import { View, Text, TextInput, Button } from "react-native";
import commonStyles from '../../../style/common';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useContext } from "react";
import { InventoryContext } from "@/context/inventory-context";
import { Inventory } from "@/models/inventory";
import { Item } from "@/models/item";
import { useRouter } from "expo-router";

export default function CreateItemScreen(){

    const inventoryContext = useContext(InventoryContext);
    const router = useRouter();

    //initialize react-hook-form using Inventory model
    const { register, handleSubmit, control } = useForm<Inventory>();

    //submit function
    const onSubmit: SubmitHandler<Inventory> = (inventory) => {

        const newItem: Item = {
            id: Math.floor(Math.random() * 100000),
            name: inventory.item.name,
            description: inventory.item.description,
        };

        const newInventory: Inventory = {
            id: Math.floor(Math.random() * 100000),
            item: newItem,
            quantity: inventory.quantity ?? 0
        };

        inventoryContext.addInvetoryByQuantity(newInventory);
        router.push("/inventory");
        console.log(inventory);
    }

    return (
        <View style={commonStyles.main}>
            <View>
                <Text>Item Name:</Text>
                <Controller
                    name="item.name"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={commonStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text>Item Description:</Text>
                <Controller
                    name="item.description"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={commonStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                {/* <Text>Item Quantity:</Text>
                <Controller
                    name="quantity"
                    control={control}
                    defaultValue={1}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType="numeric"
                            style={commonStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value.toString()}
                        />
                    )}
                /> */}
                
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
}