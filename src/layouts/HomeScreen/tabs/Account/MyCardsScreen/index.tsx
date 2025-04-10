import React from 'react';
import styles from './style';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyCardsScreen = () => {
  const navigation = useNavigation();

  const cards = [
    {
      id: 1,
      type: 'Visa',
      number: '**** **** **** 1234',
      expiry: '12/25',
    },
    {
      id: 2,
      type: 'Mastercard',
      number: '**** **** **** 5678',
      expiry: '08/24',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>My Cards</Text>
      </View>
      {cards.map((card) => (
        <View key={card.id} style={styles.card}>
          <Text style={styles.cardType}>{card.type}</Text>
          <Text style={styles.cardNumber}>{card.number}</Text>
          <Text style={styles.cardExpiry}>Expiry: {card.expiry}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyCardsScreen;
