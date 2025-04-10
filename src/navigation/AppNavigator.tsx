import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabs } from '../../App';
import SalonForWomen from '../layouts/HomeScreen/ModalScrens/saloonForWomens';
import SpaForWomen from '../layouts/HomeScreen/ModalScrens/spaForWomen';
import HairStudioForWomen from '../layouts/HomeScreen/ModalScrens/hairStudioForWomen';
import MakeUpStylingStudio from '../layouts/HomeScreen/ModalScrens/makeUpStylingStudio';
import PaymentSummary from '../layouts/HomeScreen/ModalScrens/saloonForWomens/paymentSummary';
import BookingsScreen from '../layouts/HomeScreen/tabs/Bookings';
import CardDetailsScreen from '../layouts/HomeScreen/ModalScrens/saloonForWomens/CardDetailsScreen';
import BookingDetailsScreen from '../layouts/HomeScreen/ModalScrens/saloonForWomens/BookingDetailsScreen/BookingDetailsScreen';
import EditProfile from '../layouts/HomeScreen/tabs/Account/EditProfileScreen';
import PasswordSettingsScreen from '../layouts/HomeScreen/tabs/Account/PasswordSettingsScreen';
import MyCardsScreen from '../layouts/HomeScreen/tabs/Account/MyCardsScreen';
import AccountLimitsScreen from '../layouts/HomeScreen/tabs/Account/AccountLimitsScreen';
import BiometricsScreen from '../layouts/HomeScreen/tabs/Account/BiometricScreen';
import FAQSupportScreen from '../layouts/HomeScreen/tabs/Account/FAQSupport';
import NewRegistration from '../layouts/NewRegistration';
import CardOtpScreen from '../layouts/HomeScreen/ModalScrens/saloonForWomens/paymentSummary/OtpScreen';
import LoginScreen from '../layouts/login';
import OtpScreenTesting from '../layouts/otpScreen';
import { View, Text } from 'react-native';
import AccountScreen from '../layouts/HomeScreen/tabs/Account';

const ErrorFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Something went wrong. Please restart the app.</Text>
  </View>
);

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(storedAuthState === 'true');
    };
    checkAuthState();
  }, []);

  if (isAuthenticated === null) {
    return null; // Optionally, show a loading spinner here
  }

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'HomeScreen' : 'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreenTesting} />
      <Stack.Screen name="HomeScreen" component={BottomTabs} />
      <Stack.Screen name="SalonForWomenScreen" component={SalonForWomen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="SpaForWomenScreen" component={SpaForWomen} />
      <Stack.Screen name="HairStudioForWomenScreen" component={HairStudioForWomen} />
      <Stack.Screen name="MakeUpStylingStudioScreen" component={MakeUpStylingStudio} />
      <Stack.Screen name="PaymentSummary" component={PaymentSummary} />
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} />
      <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PasswordScreen" component={PasswordSettingsScreen} />
      <Stack.Screen name="MyCards" component={MyCardsScreen} />
      <Stack.Screen name="AccountsScreenLimits" component={AccountLimitsScreen} />
      <Stack.Screen name="Biometric" component={BiometricsScreen} />
      <Stack.Screen name="FAQScreen" component={FAQSupportScreen} />
      <Stack.Screen name="newRegistration" component={NewRegistration} />
      <Stack.Screen name="cardOTPScreen" component={CardOtpScreen} />
      <Stack.Screen name="ErrorFallback" component={ErrorFallback} />
    </Stack.Navigator>
  );
};

export default AppNavigator;