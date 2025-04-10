import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import database from '@react-native-firebase/database';
import { useAuth } from '../../context/AuthContext';

const OtpScreenTesting = () => {
  type RootStackParamList = {
    Home: undefined;
    AccountScreen: { name: string; email: string; phoneNumber: string };
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { confirm, phoneNumber } = route.params as { confirm: any; phoneNumber: string };
  const userContext = useUser();
  const { login } = useAuth();

  const setPhoneNumber = userContext?.setPhoneNumber || (() => {
    console.warn('setPhoneNumber is not available in the UserContext.');
  });

  const [enteredOtp, setEnteredOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      await confirm.confirm(enteredOtp);
      Alert.alert('Success', 'OTP verified successfully!');
      login(); // Mark user as authenticated

      const snapshot = await database().ref(`/users/${phoneNumber}`).once('value');
      if (snapshot.exists()) {
        const userData = snapshot.val();
        userContext?.setUserDetails(userData); // Set user details in context
        userContext?.setPhoneNumber(phoneNumber); // Set phoneNumber in context
      } else {
        Alert.alert('Error', 'User not registered.');
      }

      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      Alert.alert('Info', 'OTP has been resent to your phone number.');
      setResendTimer(30);
      setIsResendDisabled(true);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify OTP</Text>
      <Text style={styles.infoText}>
        Enter the OTP sent to your phone number: {phoneNumber}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={enteredOtp}
        onChangeText={setEnteredOtp}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        accessibilityLabel="Verify OTP"
        accessibilityHint="Verifies the OTP entered"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
        onPress={handleResendOtp}
        accessibilityLabel="Resend OTP"
        accessibilityHint="Resends the OTP to your phone number"
        disabled={isResendDisabled || isResending}
      >
        {isResending ? (
          <ActivityIndicator color="#007BFF" />
        ) : (
          <Text style={styles.resendButtonText}>
            Resend OTP {isResendDisabled ? `in ${resendTimer}s` : ''}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  resendButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default OtpScreenTesting;
