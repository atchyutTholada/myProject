import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { useUser } from '../../../../context/UserContext';

const BookingsScreen = () => {
  const { userDetails } = useUser(); // Access user details from context
  const phoneNumber = userDetails?.phoneNumber; // Get phone number
  const navigation = useNavigation();
  const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details

  // Fetch booking details from Realtime Database
  useEffect(() => {
    if (phoneNumber) {
      database()
        .ref(`/bookings/${phoneNumber}`)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            setBookingDetails(snapshot.val());
          } else {
            setBookingDetails(null);
          }
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to fetch booking details.');
          console.error(error);
        });
    } else {
      Alert.alert('Error', 'User phone number not available.');
    }
  }, [phoneNumber]);

  // Handle delete booking
  const handleDeleteBooking = () => {
    if (phoneNumber) {
      database()
        .ref(`/bookings/${phoneNumber}`)
        .remove()
        .then(() => {
          Alert.alert('Success', 'Booking deleted successfully!');
          setBookingDetails(null); // Clear the booking details from state
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to delete booking.');
          console.error(error);
        });
    } else {
      Alert.alert('Error', 'User phone number not available.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Booking Details</Text>
      </View>

      {bookingDetails ? (
        <View style={styles.card}>
          {bookingDetails.cart.map((item, index) => (
            <View key={index} style={styles.itemDetail}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemPrice}>
                Price: ₹{(parseFloat(item.price.split('₹')[1]) * item.quantity).toFixed(2)}
              </Text>
              {index < bookingDetails.cart.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹{bookingDetails.totalAmount.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBooking}>
            <Text style={styles.deleteButtonText}>Delete Booking</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noDataText}>No bookings available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 24,
    height: 24,
    margin: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  itemDetail: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingsScreen;
