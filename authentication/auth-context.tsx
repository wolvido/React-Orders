// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Improve type safety with proper user type
type User = {
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>; // Changed from email to username
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUserData = await AsyncStorage.getItem('userData');

      console.log('Stored Token:', storedToken);
      console.log('Stored User Data:', storedUserData);
  
      if (storedToken && storedUserData) {
        const parsedUser = JSON.parse(storedUserData);
        console.log('Parsed User:', parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);

      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };


  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
  
      // Validate credentials before accepting
      if (!username || !password) {
        throw new Error('Username and password are required');
      };
  
      // Modified mock user to use username
      const mockUser = { 
        id: '1', 
        username,
        email: `${username}@example.com` // modify this later
      };
      const mockToken = 'mock-jwt-token';
  
      // Store authentication state
      await AsyncStorage.setItem('userToken', mockToken.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));
  
      setUser(mockUser);

      // auto authenticate user, add API later
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      
      // Validate input
      if (!email || !password || !username) {
        throw new Error('All fields are required');
      }

      // TODO: Replace with actual API call
      // const response = await authService.signup(email, password, username);
      
      const mockUser = { id: '1', email, username };
      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup error:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Clear all auth-related storage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
