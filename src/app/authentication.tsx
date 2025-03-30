import LoginScreen from "@/src/app/login";
import { View, Text} from "react-native";
import { useAuth } from '@/src/features/authentication-feature/context/auth-context';
import { Redirect } from "expo-router";

export default function AuthenticationScreen() {

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