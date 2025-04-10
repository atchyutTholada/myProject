import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const CardDetailsScreen = () => {
  
  type CardDetailsRouteParams = {
    service: {
      title: string;
      image: any;
      rating: string;
      price: string;
      description: string;
    };
  };

  const route = useRoute<RouteProp<{ params: CardDetailsRouteParams }, 'params'>>();
  const navigation = useNavigation();
  const {service} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{service.title}</Text>
      </View>
      <Image source={service.image} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Rating:</Text>
        <Text style={styles.detailValue}>{service.rating}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Price:</Text>
        <Text style={styles.detailValue}>{service.price}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Description:</Text>
        <Text style={styles.detailValue}>{service.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    marginRight: 10,
  },
  backArrowImage: {
    width: 25,
    height: 25,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginRight: 35, // Adjust to center the heading
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#777',
  },
});

export default CardDetailsScreen;
