// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/authentication/ctx';

export const LoginScreen = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    console.log('Auth State:', { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  const handleLogin = async () => {
    try {
      await login(user, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
          placeholder="Enter username"
          value={user}
          onChangeText={setUser}
          autoCapitalize="none"
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter password"
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
