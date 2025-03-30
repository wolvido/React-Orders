import { ScrollView, StyleSheet } from "react-native";
import { Surface, Button, Text } from "react-native-paper";
import App from '@/app.json';

import { useApiConfig } from "@/src/shared/lib/api/api-config-context";

interface ApiSelectionScreenProps {
    setDisplaySelectionScreen: (show: boolean) => void;
}

export const ApiSelectionScreen = ({
    setDisplaySelectionScreen
}: ApiSelectionScreenProps) => {

    const { setApiUrl } = useApiConfig();

    return(
        <ScrollView style={styles.devContainer}>
        <Text variant="headlineMedium" style={styles.devTitle}>Developer Screen</Text>
        
        {Object.entries(App.api).map(([name, url]) => (
          <Surface key={name} style={styles.apiCard} elevation={2}>
            <Text variant="titleMedium">
              {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <Text variant="bodySmall" numberOfLines={1}>{url}</Text>
            <Button 
              mode="contained" 
              onPress={() => setApiUrl(url)}
              style={styles.apiButton}
            >
              Set as Active
            </Button>
          </Surface>
        ))}

        <Button 
          mode="contained" 
          onPress={() => setDisplaySelectionScreen(false)}
          style={styles.apiButton}
        >
          Back to Login
        </Button>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  devContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  devTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  apiCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  apiButton: {
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  forgotPassword: {
    marginTop: 8,
  }
});