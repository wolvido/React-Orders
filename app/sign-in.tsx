import { LoginScreen } from "@/features/authentication-feature/components/login";
import { View, Text} from "react-native";
import { useAuth } from '@/features/authentication-feature/context/auth-context';
import { Redirect } from "expo-router";

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