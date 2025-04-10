import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { useUser } from '../../../../../context/UserContext';

const PaymentSummary = () => {
  const { phoneNumber } = useUser(); // Access phone number from context
  const navigation = useNavigation();
  const [cart, setCart] = useState([]); // State to store cart items
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount
  const discountRate = 0.15; // 15% discount
  const platformCharges = 20; // Example platform charges
  const additionalCharges = 10; // Example additional charges
  const advance = 50; // Example advance amount

  // Fetch cart details from Realtime Database
  useEffect(() => {
    if (phoneNumber) {
      database()
        .ref(`/carts/${phoneNumber}`)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const cartData = snapshot.val();
            setCart(cartData.items || []);
            setTotalAmount(cartData.totalAmount || 0);
          } else {
            Alert.alert('Error', 'No cart details found for this user.');
          }
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to fetch cart details.');
        });
    } else {
      Alert.alert('Error', 'User phone number not available.');
    }
  }, [phoneNumber]);

  const getTotalAmount = () => {
    const discount = totalAmount * discountRate;
    return totalAmount + platformCharges + additionalCharges - discount;
  };

  const handleConfirmAndBook = () => {
    const bookingDetails = {
      cart,
      totalAmount: getTotalAmount(),
      platformCharges,
      additionalCharges,
      discountRate,
      advance,
      cashOnDelivery: getTotalAmount() - advance,
      timestamp: new Date().toISOString(), // Add a timestamp for the booking
    };

    // Save booking details to the Realtime Database
    if (phoneNumber) {
      database()
        .ref(`/bookings/${phoneNumber}`)
        .set(bookingDetails)
        .then(() => {
          Alert.alert('Success', 'Booking confirmed successfully!');
          navigation.navigate('BookingsScreen', { bookingDetails });
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to confirm booking. Please try again.');
        });
    } else {
      Alert.alert('Error', 'User phone number not available.');
    }
  };

  const handleCardSelection = (cardType) => {
    navigation.navigate('CardDetailsScreen', { cardType }); // Ensure cardType is passed
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#f9d29c',
            marginBottom: 20,
            paddingVertical: 20,
          }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                // source={require('../../../../../../../assests/Images/PersonalServiceImages/Back-Arrow.png')}
                source={require('../../../../../assests/Images/PersonalServiceImages/Back-Arrow.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Payment Method</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Total Amount</Text>
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountText}>
              ₹{getTotalAmount().toFixed(2)}
            </Text>
            <View style={styles.securePaymentContainer}>
              <Image
                source={require('../../../../../assests/Images/PersonalServiceImages/SecureImage.png')}
                style={styles.secureIcon}
              />
              <Text
                style={styles.securePaymentText}
                numberOfLines={1}
                ellipsizeMode="tail">
                Secure Payment
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.orderSummaryContainer}>
          <Text style={styles.orderSummaryHeading}>Order summary</Text>
          <View style={styles.orderSummaryRow}>
            <Text
              style={styles.orderSummaryLabel}
              numberOfLines={1}
              ellipsizeMode="tail">
              Subtotal
            </Text>
            <Text style={styles.orderSummaryValue}>
              ₹{totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Platform Charges</Text>
            <Text style={styles.orderSummaryValue}>
              ₹{platformCharges.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Additional Charges</Text>
            <Text style={styles.orderSummaryValue}>
              ₹{additionalCharges.toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Discount</Text>
            <Text style={styles.orderSummaryValue}>
              -₹{(totalAmount * discountRate).toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Total</Text>
            <Text style={styles.orderSummaryValue}>
              ₹{getTotalAmount().toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodHeading}>Choose Payment method</Text>
          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => handleCardSelection('Visa')}>
            <Image
              source={require('../../../../../assests/Images/PersonalServiceImages/visa.png')}
              style={styles.paymentMethodImage}
            />
            <View style={styles.paymentMethodDetails}>
              <Text style={styles.paymentMethodText}>Visa</Text>
              <Text style={styles.paymentMethodSubText}>Alex Parkinson</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => handleCardSelection('Mastercard')}>
            <Image
              source={require('../../../../../assests/Images/PersonalServiceImages/mastercard.png')}
              style={styles.paymentMethodImage}
            />
            <View style={styles.paymentMethodDetails}>
              <Text style={styles.paymentMethodText}>Mastercard</Text>
              <Text style={styles.paymentMethodSubText}>James Bond</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addNewCardButton}>
            <Text style={styles.addNewCardText}>+ Add New Card</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bankHeading}>Choose Bank</Text>
        <View
          style={{
            backgroundColor: '#bee2df',
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <View style={styles.bankContainer}>
            <View style={styles.bankDetails}>
              <Image
                source={require('../../../../../assests/Images/PersonalServiceImages/shield.png')}
                style={{ width: 20, height: 20, left: 20 }}
              />
              <Text
                style={styles.bankText}
                numberOfLines={2}
                ellipsizeMode="tail">
                We adhere to the security standards{'\n'}of the payment card
                industry
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmAndBook}>
            <Text style={styles.confirmButtonText}>Confirm and Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 34,
    height: 34,
    marginRight: 10,
    left: 10,
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalAmountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  securePaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 120,
  },
  secureIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  securePaymentText: {
    fontSize: 15,
    color: '#4caf50',
    width: '100%',
  },
  orderSummaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  orderSummaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bankContainer: {
    alignItems: 'center'
  },
  orderSummaryLabel: {
    width: '100%',
    fontSize: 16,
    color: '#555',
    flexWrap: 'wrap',
  },
  orderSummaryValue: {
    fontSize: 16,
    color: '#333',
    right: 50,
  },
  paymentMethodContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  paymentMethodHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paymentMethodImage: {
    width: 40,
    height: 25,
    marginRight: 10,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
  },
  paymentMethodSubText: {
    fontSize: 14,
    color: '#777',
  },
  paymentMethodSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4caf50',
    backgroundColor: '#4caf50',
  },
  addNewCardButton: {
    paddingVertical: 10,
  },
  addNewCardText: {
    fontSize: 16,
    color: '#4caf50',
  },
  bankHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    left: 10,
  },
  bankDetails: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 30,
    flex: 1, // Ensure the text takes up available space
    opacity: 0.8,
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentSummary;
