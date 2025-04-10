import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const spaServices = [
  {
    id: 1,
    title: 'Gold Facial',
    rating: '4.0 (0 reviews)',
    price: 'Starts at $900.0',
    description:
      'A luxurious facial treatment that revitalizes your skin with the power of gold.',
    image: require('../../../../assests/Images/PersonalServiceImages/spaForWomen.jpeg'),
  },
  {
    id: 2,
    title: 'Diamond Facial',
    rating: '4.5 (10 reviews)',
    price: 'Starts at $1200.0',
    description:
      'A premium facial treatment that uses diamond particles to exfoliate and rejuvenate your skin.',
    image: require('../../../../assests/Images/PersonalServiceImages/DiamondFacial.jpg'),
  },
  {
    id: 3,
    title: 'Pearl Facial',
    rating: '4.2 (5 reviews)',
    price: 'Starts at $1000.0',
    description:
      'A luxurious facial treatment that uses pearl extracts to brighten and hydrate your skin.',
    image: require('../../../../assests/Images/PersonalServiceImages/PearlImage.jpg'),
  },
  {
    id: 4,
    title: 'Platinum Facial',
    rating: '4.8 (15 reviews)',
    price: 'Starts at $1500.0',
    description:
      'A high-end facial treatment that uses platinum particles to provide anti-aging benefits and a radiant glow.',
    image: require('../../../../assests/Images/PersonalServiceImages/PlatinumImage.jpg'),
  },
  {
    id: 5,
    title: 'Silver Facial',
    rating: '4.3 (8 reviews)',
    price: 'Starts at $800.0',
    description:
      'A refreshing facial treatment that uses silver particles to cleanse and purify your skin.',
    image: require('../../../../assests/Images/PersonalServiceImages/SilverFacial.jpg'),
  },
];

const SpaForWomen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: number;
    title: string;
    rating: string;
    price: string;
    description: string;
    image: any;
  } | null>(null);

  const navigation = useNavigation();

  const handleAddPress = service => {
    setSelectedService(service);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={style.backButton}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')} // Ensure this path is correct
            style={style.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Spa for Women</Text>
      </View>
      {spaServices.map((service, index) => (
        <View key={service.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.rating}>
                <Image
                  source={require('../../../../assests/Images/PersonalServiceImages/star.png')}
                  style={{height: 10, width: 10}}
                />
                <Text style={styles.ratingText}> {service.rating}</Text>
              </Text>
              <Text style={styles.price}>{service.price}</Text>
              <Text style={styles.description}>• {service.description}</Text>
              <TouchableOpacity>
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
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddPress(service)}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          {index < spaServices.length - 1 && (
            <View style={styles.separator} />
          )}
        </View>
      ))}

      {/* Add to Cart Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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
                  onPress={() => setModalVisible(false)}>
                  <Text style={style.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalServiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalServicePrice: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  modalServiceDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#3064b8',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 50, // Add some margin to the right
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  card: {
    backgroundColor: '#f9f9f9', // Light grey background for the card
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
});

export default SpaForWomen;
