import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { useUser } from '../../../../context/UserContext';

// List of salon services
const salonServices = [
  {
    id: 1,
    title: 'Hair Cut',
    rating: '4.0 (0 reviews)',
    price: 'Starts at ₹50.0',
    description: 'A Professional haircut to give you a fresh and stylish look.',
    image: require('../../../../assests/Images/PersonalServiceImages/HairCutImageWomen.jpg'),
  },
  {
    id: 2,
    title: 'Hair Coloring',
    rating: '4.5 (10 reviews)',
    price: 'Starts at ₹100.0',
    description:
      'A Premium hair coloring service to give your hair a vibrant new color.',
    image: require('../../../../assests/Images/PersonalServiceImages/HairColoring.jpg'),
  },
  {
    id: 3,
    title: 'Manicure',
    rating: '4.2 (5 reviews)',
    price: 'Starts at ₹30.0',
    description: 'A Luxurious manicure to keep your nails looking their best.',
    image: require('../../../../assests/Images/PersonalServiceImages/ManicureImage.jpg'),
  },
  {
    id: 4,
    title: 'Pedicure',
    rating: '4.8 (15 reviews)',
    price: 'Starts at ₹40.0',
    description:
      'A Relaxing pedicure to pamper your feet and keep them healthy.',
    image: require('../../../../assests/Images/PersonalServiceImages/Pedicure.jpg'),
  },
  {
    id: 5,
    title: 'Massage',
    rating: '4.3 (8 reviews)',
    price: 'Starts at ₹60.0',
    description: 'A Soothing massage to relieve stress and tension.',
    image: require('../../../../assests/Images/PersonalServiceImages/Massage.jpg'),
  },
];

const SalonForWomen = () => {
  const { phoneNumber } = useUser(); // Access phone number from context
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedService, setSelectedService] = useState(null); // State to track the selected service
  const [cart, setCart] = useState([]); // State to track cart items
  const [showCartSummary, setShowCartSummary] = useState(false); // State to show/hide cart summary
  const navigation = useNavigation();

  // Function to handle adding a service to the cart
  const handleIncrement = (service) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService) {
        return prevCart.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });
    setShowCartSummary(true); // Show cart summary
  };

  // Function to handle removing a service from the cart
  const handleDecrement = (service) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService && existingService.quantity === 1) {
        return prevCart.filter((item) => item.id !== service.id);
      } else {
        return prevCart.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Function to calculate the total amount in the cart
  const getTotalAmount = () => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.split('₹')[1]) * item.quantity,
      0
    );
  };

  // Function to save cart details to the Realtime Database
  const saveCartToDatabase = () => {
    if (phoneNumber) {
      // Prepare the cart details
      const cartDetails = {
        totalAmount: getTotalAmount(), // Calculate the total amount
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          rating: item.rating,
          price: item.price,
          description: item.description,
          image: item.image, // Store the image path or URL
          quantity: item.quantity, // Quantity of the item
        })),
      };

      // Save the cart details to the Realtime Database under the user's phone number
      database()
        .ref(`/carts/${phoneNumber}`)
        .set(cartDetails)
        .then(() => {
          Alert.alert('Success', 'Cart details saved successfully!');
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to save cart details.');
        });
    } else {
      Alert.alert('Error', 'User phone number not available.');
    }
  };

  // Function to navigate to the service details screen
  const handleViewDetails = (service) => {
    navigation.navigate('CardDetailsScreen', { service });
  };

  // Function to navigate to the cart summary screen
  const handleViewCart = () => {
    saveCartToDatabase(); // Save cart details to the database
    navigation.navigate('PaymentSummary', { cart });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header Section */}
        <View style={style.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')}
              style={style.backButton}
            />
          </TouchableOpacity>
          <Text style={style.heading}>Salon For Women</Text>
        </View>

        {/* List of Services */}
        {salonServices.map((service, index) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.rating}>
                  <Image
                    source={require('../../../../assests/Images/PersonalServiceImages/star.png')}
                    style={{ height: 10, width: 10 }}
                  />
                  <Text style={styles.ratingText}> {service.rating}</Text>
                </Text>
                <Text style={styles.price}>{service.price}</Text>
                <Text style={styles.description}>• {service.description}</Text>
                <TouchableOpacity onPress={() => handleViewDetails(service)}>
                  <Text style={styles.viewDetails}>View details</Text>
                  <Image
                    style={{
                      width: 8,
                      height: 8,
                      left: 70,
                      bottom: 11,
                      tintColor: '#3064b8',
                    }}
                    source={require('../../../../assests/Images/PersonalServiceImages/right-arrow.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardRight}>
                <Image source={service.image} style={styles.image} />
                {cart.find((item) => item.id === service.id) ? (
                  <View style={style.quantityContainer}>
                    <TouchableOpacity
                      style={style.decrementButton}
                      onPress={() => handleDecrement(service)}
                    >
                      <Text style={style.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {cart.find((item) => item.id === service.id)?.quantity}
                    </Text>
                    <TouchableOpacity
                      style={style.incrementButton}
                      onPress={() => handleIncrement(service)}
                    >
                      <Text style={style.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleIncrement(service)}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {index < salonServices.length - 1 && (
              <View>
                <View style={styles.separator} />
              </View>
            )}
          </View>
        ))}

        {/* Add to Cart Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Add to Cart</Text>
              {selectedService && (
                <>
                  <Image
                    source={selectedService.image}
                    style={style.modalImage}
                  />
                  <Text style={style.modalServiceTitle}>
                    {selectedService.title}
                  </Text>
                  <Text style={style.modalServicePrice}>
                    {selectedService.price}
                  </Text>
                  <Text style={style.modalServiceDescription}>
                    {selectedService.description}
                  </Text>
                  <TouchableOpacity
                    style={style.modalCloseButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={style.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Cart Summary */}
      {showCartSummary && cart.length > 0 && (
        <View style={styles.cartSummaryPopup}>
          <Text style={styles.cartSummaryText}>
            {`Total: ₹${getTotalAmount().toFixed(2)}`}
          </Text>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={handleViewCart}
          >
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalServiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalServicePrice: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalServiceDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    width: '100%',
  },
  ratingStar: {
    fontSize: 16,
    color: 'gold',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3064b8',
    borderRadius: 5,
    padding: 5,
  },
  decrementButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  incrementButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 20,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  cartSummaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: '#3064b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartSummaryPopup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  heading: {
    flex: 1,
    textAlign: 'right',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 70,
  },
});

export default SalonForWomen;
