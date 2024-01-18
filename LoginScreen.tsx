// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { loginUser } from './apiService'; 
import { useAuth } from './src/context/AuthContext';
import { themeColors } from './themes'; 


type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};



const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth(); // Use the useAuth hook

  const handleLogin = async() => {
    try {
      // Call the loginUser function
      const result = await loginUser(useremail, password);
      console.log('User logged in successfully:', result);
      const { role } = result; // Assuming your API response has a 'role' field

    // Redirect based on user role
    if (role === 'admin') {
      navigation.navigate('AdminDashboardTabs');
    } else {
      navigation.navigate('DashboardTabs');
    }

    // Store the token and user role in the context
    login(result.token, role);

    setUseremail('');
    setPassword('');
    } catch (error) {
      // Handle login error, show error message, etc.
      console.error('Error logging in user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.text.darker }]}>Login</Text>
      <Text>Don’t have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>Sign up</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={useremail}
        onChangeText={(text) => setUseremail(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    margin: 10,
  },
});


export default LoginScreen;
