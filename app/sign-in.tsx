import { LoginScreen } from "@/components/login";
import { View, Text} from "react-native";
import { useAuth } from '@/authentication/auth-context';
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
                <LoginScreen/>
            </View>
        )
    }

    return <Redirect href="/(tabs)/(orders)/orders" />;
}