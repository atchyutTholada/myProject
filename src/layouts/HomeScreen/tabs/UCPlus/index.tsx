import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const UrbanCompanyPlusScreen = () => {
  const benefits = [
    {
      id: '1',
      title: 'Priority Booking',
      description: 'Get ahead of the queue.',
    },
    {
      id: '2',
      title: 'Exclusive Discounts',
      description: 'Save more on every service.',
    },
    {
      id: '3',
      title: 'Free Cancellations',
      description: 'Cancel anytime, no fees.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../assests/Images/PersonalServiceImages/UrbanCompanyImage.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>UrbanCompanyPlus</Text>
      </View>

      {/* Hero */}
      <ImageBackground
        source={require('../../../../assests/Images/PersonalServiceImages/UrbanCompanyImage.png')}
        style={styles.hero}>
        <Text style={styles.heroText}>Unlock Premium Services</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Benefits */}
      <FlatList
        data={benefits}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.benefitItem}>
            <Text style={styles.benefitTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {flexDirection: 'row', alignItems: 'center', padding: 10},
  logo: {width: 40, height: 40},
  title: {fontSize: 24, fontWeight: 'bold', marginLeft: 10},
  hero: {height: 200, justifyContent: 'center', alignItems: 'center'},
  heroText: {color: '#fff', fontSize: 20, fontWeight: 'bold', top: 100},
  joinButton: {
    backgroundColor: '#00C4B4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontSize: 16},
  benefitItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd'},
  benefitTitle: {fontSize: 18, fontWeight: 'bold'},
});

export default UrbanCompanyPlusScreen;
