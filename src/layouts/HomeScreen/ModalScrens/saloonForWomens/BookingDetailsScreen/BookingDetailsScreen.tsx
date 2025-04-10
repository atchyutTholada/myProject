import React from 'react';
import styles from './style';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

type BookingDetailsRouteProp = RouteProp<
  {
    params: {
      paymentSummary: {
        item: {
          title: string;
          image: any;
          rating: string;
          price: string;
          description: string;
          quantity: number;
        };
        itemTotal: number;
        platformCharges: number;
        discount: number;
        additionalCharges: number;
        total: number;
        advance: number;
        cashOnDelivery: number;
      };
    };
  },
  'params'
>;

const BookingDetailsScreen = () => {
  const route = useRoute<BookingDetailsRouteProp>();
  const navigation = useNavigation();
  const {paymentSummary} = route.params;
  const {
    item,
    itemTotal,
    platformCharges,
    discount,
    additionalCharges,
    total,
    advance,
    cashOnDelivery,
  } = paymentSummary;

  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      'Your booking has been successfully confirmed.',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{item.title}</Text>
      </View>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Rating:</Text>
          <Text style={styles.detailValue}>{item.rating}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>{item.price}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Description:</Text>
          <Text style={styles.detailValue}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total:</Text>
          <Text style={styles.summaryValue}>₹{itemTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Platform Charges:</Text>
          <Text style={styles.summaryValue}>₹{platformCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Additional Charges:</Text>
          <Text style={styles.summaryValue}>
            ₹{additionalCharges.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount:</Text>
          <Text style={styles.summaryValue}>-₹{discount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>₹{total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Advance:</Text>
          <Text style={styles.summaryValue}>₹{advance.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Cash on Delivery:</Text>
          <Text style={styles.summaryValue}>₹{cashOnDelivery.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service Tax:</Text>
          <Text style={styles.summaryValue}>₹{(total * 0.05).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST:</Text>
          <Text style={styles.summaryValue}>₹{(total * 0.18).toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookingDetailsScreen;
