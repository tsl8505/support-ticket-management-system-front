// UserDashboard.tsx
import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { useAuth } from './src/context/AuthContext';
type UserDashboardProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const UserDashboard : React.FC< UserDashboardProps > = ({ navigation }) => {
    const { token, userRole, logout } = useAuth();

    const handleLogout = () => {
        // Call the logout function when the button is clicked
        logout();
    
        // Navigate to the Login screen or any other desired screen
        navigation.navigate('Login');
    };
  

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Your Dashboard</Text>
          <Text style={styles.subtitle}>
            You are currently viewing the {userRole === 'admin' ? 'Admin' : 'User'} Dashboard
          </Text>
          <Text style={styles.token}>Token: {token}</Text>
    
          {/* Logout button */}
          <TouchableHighlight
            style={styles.logoutButton}
            underlayColor="#e74c3c" // Set button background color on press
            onPress={handleLogout}
        >
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 12,
      color: '#555',
    },
    token: {
      fontSize: 16,
      marginBottom: 24,
      color: '#777',
    },
    logoutButton: {
      backgroundColor: '#e74c3c',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
});

export default UserDashboard;
