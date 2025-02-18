import { LoginScreen } from "@/components/login";
import { View, Text} from "react-native";
import { useAuth } from '@/authentication/ctx';
import { Redirect } from "expo-router";
import App from "@/app.json";

export default function SignInScreen() {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!isAuthenticated) {
        return(
            <View style={{  flex: 1, height: '100%'}}>
                <Text>Api connection: {App.api.main}</Text>
                <LoginScreen/>
            </View>
        )
    }

    return <Redirect href="/(tabs)/(orders)/orders" />;
}