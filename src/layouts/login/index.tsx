import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import firestore from '@react-native-firebase/firestore'; // Import Firestore for user validation
import database from '@react-native-firebase/database'; // Import Realtime Database
import styles from './style';
import { useAuth } from '../../context/AuthContext';

let lastOtpRequestTime = 0;

const LoginScreen = ({navigation, route}) => {

  const {login} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(
    route.params?.phoneNumber || '',
  ); // Pre-fill phone number if passed from New Registration

  const handleSendOtp = async () => {
    const currentTime = Date.now();
    if (currentTime - lastOtpRequestTime < 60000) {
      Alert.alert(
        'Too Many Requests',
        'Please wait a minute before requesting another OTP.',
      );
      return;
    }

    if (phoneNumber.length === 10) {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(phoneNumber)
          .get();
        const userRealtime = await database()
          .ref(`/users/${phoneNumber}`)
          .once('value');

        if (!userDoc.exists && !userRealtime.exists()) {
          Alert.alert(
            'New Number',
            'This phone number is not registered. Please register first.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Register',
                onPress: () => {
                  // Save user details in Realtime Database
                 database().ref(`/users/${phoneNumber}`).set({
                  name: '', // Replace with the appropriate value or variable
                  email: '', // Replace with the appropriate email value or variable
                  phoneNumber,
                  profileImage: null,
                 });
                navigation.navigate('newRegistration');
                }
              },
            ],
          );
          return;
        }

        // Use Firebase's invisible reCAPTCHA verifier
        const confirmation = await auth().signInWithPhoneNumber(
          `+91${phoneNumber}`,
        );

        lastOtpRequestTime = currentTime;
        Alert.alert('OTP Sent', `An OTP has been sent to +91 ${phoneNumber}`);
        login(); // Mark user as authenticated
        navigation.navigate('OtpScreen', {confirm: confirmation, phoneNumber});
      } catch (error) {
        // Handle errors
        if (error.code === 'auth/too-many-requests') {
          Alert.alert(
            'Too Many Requests',
            'You have made too many requests. Please try again later.',
          );
        } else if (error.code === 'auth/invalid-phone-number') {
          Alert.alert('Invalid Number', 'The phone number entered is invalid.');
        } else {
          Alert.alert(
            'Error',
            error.message || 'An error occurred while sending OTP.',
          );
        }
      }
    } else {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit phone number.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Image
        style={styles.HomeServices}
        source={require('../../assests/HomeServices.png')}
      />
      <View style={styles.container}>
        <Text style={styles.prefix}>+91</Text>
        <Text style={styles.separator}>|</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Text style={styles.infoText}>
        An OTP will be sent on the given phone number for verification.
      </Text>
      <Text style={styles.infoText1}>
        Standard message and data rates apply.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('newRegistration')}>
        <Text style={styles.newRegistrationText}>New Registration</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
