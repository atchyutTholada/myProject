import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const AccountLimitsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Account Limits</Text>
      </View>
      <View style={styles.limitContainer}>
        <Text style={styles.limitLabel}>Daily Transaction Limit</Text>
        <Text style={styles.limitValue}>₹50,000</Text>
      </View>
      <View style={styles.limitContainer}>
        <Text style={styles.limitLabel}>Monthly Transaction Limit</Text>
        <Text style={styles.limitValue}>₹5,00,000</Text>
      </View>
      <View style={styles.limitContainer}>
        <Text style={styles.limitLabel}>Remaining Limit</Text>
        <Text style={styles.limitValue}>₹2,50,000</Text>
      </View>
    </View>
  );
};



export default AccountLimitsScreen;
