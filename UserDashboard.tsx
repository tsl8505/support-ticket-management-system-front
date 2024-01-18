// LoginScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
type UserDashboardProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const UserDashboard : React.FC< UserDashboardProps > = ({ navigation }) => {
  

  return (
    <View>
      <Text>This is Jane's UserDashboard</Text>
    </View>
  );
};

export default UserDashboard;
