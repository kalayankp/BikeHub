// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditUser from '../screens/EditUser';

// Import images
import homeIcon from '../img/home.png';
import homeIconFocused from '../img/home.png';
import profileIcon from '../img/profile.png';
import profileIconFocused from '../img/profile.png';
import settingsIcon from '../img/settings.png';
import settingsIconFocused from '../img/settings.png';

// Define stack navigators
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Authentication Stack
const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
   
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

// Main Stack with Bottom Tabs
const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
    <AuthStack.Screen name="Edit" component={EditUser} />
  </MainStack.Navigator>
);

// Bottom Tabs Navigator
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconSource;

        if (route.name === 'Home') {
          iconSource = focused ? homeIconFocused : homeIcon;
        } else if (route.name === 'Profile') {
          iconSource = focused ? profileIconFocused : profileIcon;
        } else if (route.name === 'Settings') {
          iconSource = focused ? settingsIconFocused : settingsIcon;
        }

        return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor: 'transparent',
        elevation: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  
    <Tab.Screen name="Settings" component={SettingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    {/* Add other tabs here */}
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
