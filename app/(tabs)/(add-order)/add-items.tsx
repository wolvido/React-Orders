import StepIndicator from "@/components/order-step-indicator";
import { Link } from "expo-router";
import { View } from "react-native";
import { Cart } from "@/entities/cart";
import { CartItem } from "@/models/cart-item";
import { products } from "@/dummy-data/dummy-products";
import { Product } from "@/entities/product";

//react component
export default function AddItemsScreen() {

    return (
        <View>
            <StepIndicator currentStep={2} />



            <Link href="/finalize-order">finalize</Link>
        </View>

    );
  }