import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from './src/context/AuthContext';

const UserProfileScreen = () => {
  const { token, userRole } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.text}>Token: {token}</Text>
      <Text style={styles.text}>User Role: {userRole}</Text>
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
});

export default UserProfileScreen;
