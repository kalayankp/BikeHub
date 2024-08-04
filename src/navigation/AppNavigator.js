import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditUser from '../screens/EditUser';
import Bikelistingfilter from '../screens/Bikelistingfilter';
import BikeDetailsScreen from '../screens/BikeDetailsScreen';
import MapScreen from '../screens/MapScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';

// Import images for tab icons
import homeIcon from '../img/home.png';
import homeIconFocused from '../img/home.png';
import mapIcon from '../img/map.png';
import mapIconFocused from '../img/map.png';
import cartIcon from '../img/cart.png';
import cartIconFocused from '../img/cart.png';
import documentsIcon from '../img/documents.png';
import documentsIconFocused from '../img/documents.png';
import profileIcon from '../img/profile.png';
import profileIconFocused from '../img/profile.png';

// Define stack navigators
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BikeDetailsStack = createStackNavigator(); // Add a nested stack for BikeDetails

// Authentication Stack
const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="OTP" component={OTPVerificationScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
    <AuthStack.Screen name="Bikefilter" component={Bikelistingfilter} options={{ headerShown: false }} />
    <AuthStack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Order" component={OrderConfirmationScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

// BikeDetails Stack (nested)
const BikeDetailsStackNavigator = () => (
  <BikeDetailsStack.Navigator>
    <BikeDetailsStack.Screen name="Bikefilter" component={Bikelistingfilter} options={{ headerShown: false }} />
    <BikeDetailsStack.Screen name="BikeDetails" component={BikeDetailsScreen} options={{ headerShown: false }} />
  </BikeDetailsStack.Navigator>
);

// Main Stack with Bottom Tabs
const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
    <MainStack.Screen name="EditUser" component={EditUser} options={{ headerShown: false }} />
    <MainStack.Screen name="Bikelist" component={Bikelistingfilter} options={{ headerShown: false }} />
    
  
  </MainStack.Navigator>
);

// Bottom Tabs Navigator
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconSource;

        if (route.name === 'Bikes') {
          iconSource = focused ? homeIconFocused : homeIcon;
        } else if (route.name === 'Map') {
          iconSource = focused ? mapIconFocused : mapIcon;
        } else if (route.name === 'Cart') {
          iconSource = focused ? cartIconFocused : cartIcon;
        } else if (route.name === 'Documents') {
          iconSource = focused ? documentsIconFocused : documentsIcon;
        } else if (route.name === 'Profile') {
          iconSource = focused ? profileIconFocused : profileIcon;
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
    <Tab.Screen name="Bikes" component={BikeDetailsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Documents" component={DocumentsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
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
