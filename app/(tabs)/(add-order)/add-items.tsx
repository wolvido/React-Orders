import StepIndicator from "@/components/order-step-indicator";
import { Link } from "expo-router";
import { View } from "react-native";

//react component
export default function AddItemsScreen() {

    return (
        <View>
            <StepIndicator currentStep={2} />
            <Link href="/finalize-order">finalize</Link>
        </View>

    );
  }