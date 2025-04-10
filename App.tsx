import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/layouts/HomeScreen';
import BookingsScreen from './src/layouts/HomeScreen/tabs/Bookings';
import UCPlusScreen from './src/layouts/HomeScreen/tabs/UCPlus';
import RewardsScreen from './src/layouts/HomeScreen/tabs/Rewards';
import AccountScreen from './src/layouts/HomeScreen/tabs/Account';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'Home')
            iconSource = require('./src/assests/UCImage.png');
          else if (route.name === 'Bookings')
            iconSource = require('./src/assests/booking.png');
          else if (route.name === 'UCPlus')
            iconSource = require('./src/assests/UCPlusImage.jpg');
          else if (route.name === 'Rewards')
            iconSource = require('./src/assests/medal.png');
          else if (route.name === 'Account')
            iconSource = require('./src/assests/user.png');

          return (
            <Image
              source={iconSource}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="UCPlus" component={UCPlusScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  );
}
