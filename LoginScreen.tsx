// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};



const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement authentication logic here
    // Check user credentials, fetch user role, etc.

    // For demo purposes, assuming 'admin' role for a specific user
    const userRole = 'admin';

    // Redirect based on user role
    if (userRole === 'admin') {
      navigation.navigate('AdminDashboard');
    } else {
      navigation.navigate('UserDashboard');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
