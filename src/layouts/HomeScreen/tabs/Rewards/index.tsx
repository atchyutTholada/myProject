import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const rewards = [
  {
    id: 1,
    title: 'Gold Member',
    description: 'You have achieved Gold Member status. Enjoy exclusive benefits!',
    image: require('../../../../assests/Images/PersonalServiceImages/MedalImage.png'),
  },
  {
    id: 2,
    title: 'First Booking',
    description: 'Congratulations on your first booking! Enjoy a 10% discount on your next service.',
    image: require('../../../../assests/Images/PersonalServiceImages/FirstService.png'),
  },
  {
    id: 3,
    title: 'Loyal Customer',
    description: 'Thank you for being a loyal customer. Enjoy a 20% discount on your next service.',
    image: require('../../../../assests/Images/PersonalServiceImages/LoyalCustomer.jpg'),
  },
];

const RewardsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.heading}>My Rewards</Text>
        </View>
      </View>
      {rewards.map((reward) => (
        <View key={reward.id} style={styles.rewardCard}>
          <Image source={reward.image} style={styles.rewardImage} />
          <View style={styles.rewardContent}>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardDescription}>{reward.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
    backgroundColor: '#c8c31a', // Background color for "My Rewards"
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10, // Reduced paddingHorizontal
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', // Changed to white for contrast with the background
    textAlign: 'center',
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#777',
  },
});

export default RewardsScreen;