import { LoginScreen } from "@/components/login";
import { View, Text} from "react-native";
import { useAuth } from '@/authentication/ctx';
import { Redirect } from "expo-router";

export default function SignInScreen() {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!isAuthenticated) {
        return(
            <View>
                <LoginScreen/>
            </View>
        )
    }

    return <Redirect href="/(tabs)/(orders)/orders" />;
}