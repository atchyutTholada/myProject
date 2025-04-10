import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const BookingsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Ensure bookingDetails has a default value to prevent undefined errors
  const bookingDetails = route.params?.bookingDetails || { cart: [] };

  const handleCardPress = (item) => {
    const platformCharges = 20; // Example platform charges
    const discount = 30; // Example discount amount
    const additionalCharges = 10; // Example additional charges
    const itemTotal = parseFloat(item.price.split('₹')[1]) * item.quantity;
    const total = itemTotal + platformCharges + additionalCharges - discount;
    const advance = 50; // Example advance amount
    const cashOnDelivery = total - advance;

    const paymentSummary = {
      item,
      itemTotal,
      platformCharges,
      discount,
      additionalCharges,
      total,
      advance,
      cashOnDelivery,
    };
    navigation.navigate('BookingDetailsScreen', { paymentSummary });
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

      {bookingDetails.cart.length > 0 ? (
        <View style={styles.card}>
          {bookingDetails.cart.map((item, index) => (
            <TouchableOpacity key={item.id} onPress={() => handleCardPress(item)}>
              <View key={item.id} style={styles.itemDetail}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>Price: {item.price}</Text>
                <Text style={styles.itemRating}>Rating: {item.rating}</Text>
                {index < bookingDetails.cart.length - 1 && <View style={styles.separator} />}
              </View>
            </TouchableOpacity>
          ))}
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
  itemRating: {
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
});

export default BookingsScreen;
