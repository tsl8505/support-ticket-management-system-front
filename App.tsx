// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import TicketRequestScreen from './TicketRequestScreen';
import TicketStatusScreen from './TicketStatusScreen';
import UserProfileScreen from './UserProfileScreen';

import { AuthProvider } from './src/context/AuthContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TicketRequest" component={TicketRequestScreen} />
      <Tab.Screen name="TicketStatus" component={TicketStatusScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};
const AdminDashboardTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TicketStatus" component={TicketStatusScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="DashboardTabs" component={DashboardTabs} options={{ headerBackVisible: false }} />

          <Stack.Screen name="AdminDashboardTabs" component={AdminDashboardTabs} options={{ headerBackVisible: false }} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;