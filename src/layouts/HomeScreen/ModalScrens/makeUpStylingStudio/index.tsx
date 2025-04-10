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

const makeUpStylingServices = [
  {
    id: 1,
    title: 'Bridal Makeup',
    rating: '4.9 (20 reviews)',
    price: 'Starts at ₹200.0', // Replaced $ with ₹
    description:
      'Professional bridal makeup to make you look stunning on your special day.',
    image: require('../../../../assests/Images/PersonalServiceImages/BridalImage.jpg'),
  },
  {
    id: 2,
    title: 'Party Makeup',
    rating: '4.7 (15 reviews)',
    price: 'Starts at ₹150.0', // Replaced $ with ₹
    description: 'Glamorous party makeup to make you stand out at any event.',
    image: require('../../../../assests/Images/PersonalServiceImages/PartyMakeUp.jpg'),
  },
  {
    id: 3,
    title: 'Casual Makeup',
    rating: '4.5 (10 reviews)',
    price: 'Starts at ₹100.0', // Replaced $ with ₹
    description: 'Natural and casual makeup for everyday wear.',
    image: require('../../../../assests/Images/PersonalServiceImages/CasualMakeUpImage.jpg'),
  },
  {
    id: 4,
    title: 'Photoshoot Makeup',
    rating: '4.8 (18 reviews)',
    price: 'Starts at ₹180.0', // Replaced $ with ₹
    description:
      'Professional makeup for photoshoots to make you look flawless on camera.',
    image: require('../../../../assests/Images/PersonalServiceImages/PhotoshootMakeUp.jpg'),
  },
  {
    id: 5,
    title: 'Special Effects Makeup',
    rating: '4.6 (12 reviews)',
    price: 'Starts at ₹250.0', // Replaced $ with ₹
    description:
      'Creative special effects makeup for themed events and performances.',
    image: require('../../../../assests/Images/PersonalServiceImages/SpecialEffectsImage.jpg'),
  },
];

const MakeUpStylingStudio = () => {
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={style.backButton}>
        <Image
          source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')} // Ensure this path is correct
          style={style.backButtonImage}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Make Up Styling Studio</Text>
      {makeUpStylingServices.map((service, index) => (
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
          {index < makeUpStylingServices.length - 1 && (
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
  backButton: {
    margin: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
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

export default MakeUpStylingStudio;
