// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/src/features/auth-feature/context/auth-context';
import { useProducts } from '@/src/entities/product/context-service/product-context';
import { useSuppliers } from '@/src/entities/supplier/context-service/supplier-context';
import { usePurchaseOrder } from '@/src/features/purchase-order-feature/context/purchase-order-context';
import { DevModeScreen } from '@/src/features/dev-mode-feature/components/dev-mode-screen';

const LoginScreen = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showHiddenScreen, setShowHiddenScreen] = useState(false);

  const { refreshProducts, loadProductSchemas } = useProducts();
  const { refreshSuppliers } = useSuppliers();
  const { reloadPurchaseOrders } = usePurchaseOrder();

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

      loadProductSchemas();
      refreshProducts();
      refreshSuppliers();
      reloadPurchaseOrders();
      await login(user, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (showHiddenScreen) {
    return (
      <DevModeScreen setDisplayDevModeScreen={setShowHiddenScreen} />
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

export default LoginScreen;

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
