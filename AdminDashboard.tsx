// LoginScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
type AdminDashboardProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const AdminDashboard : React.FC< AdminDashboardProps > = ({ navigation }) => {
  

  return (
    <View>
      <Text>This is Jane's AdminDashboard</Text>
    </View>
  );
};

export default AdminDashboard;
