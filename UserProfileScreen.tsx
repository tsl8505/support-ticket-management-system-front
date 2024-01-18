import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';


import { useAuth } from './src/context/AuthContext';
type UserProfileScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'TicketRequest'>;
  };

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation }) => {
  const { email, userRole, logout} = useAuth();

  const handleLogout = () => {
    // Call the logout function from your authentication context
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>User Role: {userRole}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserProfileScreen;
