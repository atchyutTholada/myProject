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


const FAQSupportScreen = () => {
  const navigation = useNavigation();

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Password Settings and follow the instructions to reset your password.',
    },
    {
      question: 'How do I add a new card?',
      answer: 'Go to My Cards and click on "+ Add New Card" to add a new card.',
    },
    {
      question: 'How do I enable biometrics?',
      answer: 'Go to Biometrics and toggle the switch to enable biometrics.',
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
        <Text style={styles.heading}>FAQ/Support</Text>
      </View>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


export default FAQSupportScreen;
