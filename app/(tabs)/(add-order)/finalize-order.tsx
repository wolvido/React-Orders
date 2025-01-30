import StepIndicator from "@/context/order-step-indicator";
import { View } from "react-native";

//react component
export default function FinalizeOrderScreen() {

    return (
        <View>
            <StepIndicator currentStep={3} />
        </View>

    );
  }