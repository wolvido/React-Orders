// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/authentication/ctx';
import App from '@/app.json';
import { useApi } from '@/context/dev-mode-context';
import { useProducts } from '@/context/product-context';
import { useSuppliers } from '@/context/supplier-context';

export const LoginScreen = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showHiddenScreen, setShowHiddenScreen] = useState(false);

  const { refreshProducts } = useProducts();
  const { refreshSuppliers } = useSuppliers();

  const { setApiUrl } = useApi();

  useEffect(() => {
    console.log('Auth State:', { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  const handleLogin = async () => {
    try {
      // if (user === 'baseurl'){
      //   setApiUrl(App.api.baseUrl);
      // }

      if (user === 'winzyl') {
        setShowHiddenScreen(true);
        return;
      }

      refreshProducts();
      refreshSuppliers();
      await login(user, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (showHiddenScreen) {
    return (
      <View style={styles.devContainer}>
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
          onPress={() => setShowHiddenScreen(false)}
          style={styles.apiButton}
        >
          Back to Login
        </Button>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Surface style={styles.surface} elevation={4}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome Back
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Please sign in to continue
        </Text>

        <TextInput
          mode="outlined"
          label="Username"
          placeholder="Enter your username"
          value={user}
          onChangeText={setUser}
          autoCapitalize="none"
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon 
              icon={secureTextEntry ? "eye" : "eye-off"} 
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={isLoading}
          loading={isLoading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Button
          mode="text"
          onPress={() => {/* Handle forgot password */}}
          style={styles.forgotPassword}
        >
          Forgot Password?
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
};

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
