import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useNavigation} from '@react-navigation/native';

Geocoder.init('AIzaSyC6FqH0ZZ9eYCumGWjvCdYx_VMNTmaMD6E');

const services = [
  {
    id: 1,
    image: require('../../assests/Images/PersonalServiceImages/salonForWomen.png'),
    label: 'Salon for Women',
  },
  {
    id: 2,
    image: require('../../assests/Images/PersonalServiceImages/spaForMen.png'),
    label: 'Spa for Women',
  },
  {
    id: 3,
    image: require('../../assests/Images/PersonalServiceImages/hairAndSkin.png'),
    label: 'Hair & Skin',
  },
  {
    id: 4,
    image: require('../../assests/Images/PersonalServiceImages/salonForMen.png'),
    label: 'Salon for Men',
  },
  {
    id: 5,
    image: require('../../assests/Images/PersonalServiceImages/MassageForMen.png'),
    label: 'Massage for Men',
  },
];

const services1 = [
  {
    id: 1,
    image: require('../../assests/Images/HomeServicesImages/ElectricalPlumbing.png'),
    label: 'Electrical Plumbing',
  },
  {
    id: 2,
    image: require('../../assests/Images/HomeServicesImages/CleaningAndPest.png'),
    label: 'Cleaning & Pest',
  },
  {
    id: 3,
    image: require('../../assests/Images/HomeServicesImages/HomeRepairs.png'),
    label: 'Home Repairs',
  },
  {
    id: 4,
    image: require('../../assests/Images/HomeServicesImages/HomePainting.png'),
    label: 'Home Painting',
  },
  {
    id: 5,
    image: require('../../assests/Images/HomeServicesImages/CleaningAndPest.png'),
    label: 'Cleaning & Pest',
  },
];

const services2 = [
  {
    id: 1,
    image: require('../../assests/Images/TrendingImages/BleachAndDaton.png'),
    label: 'Bleach & Daton',
  },
  {
    id: 2,
    image: require('../../assests/Images/TrendingImages/TVInstalling.png'),
    label: 'TV Installing',
  },
  {
    id: 3,
    image: require('../../assests/Images/TrendingImages/ACRepairs.png'),
    label: 'AC Repair',
  },
  {
    id: 4,
    image: require('../../assests/Images/TrendingImages/HairCore.png'),
    label: 'Hair Core',
  },
  {
    id: 5,
    image: require('../../assests/Images/TrendingImages/HeadMassage.png'),
    label: 'Head Massage ',
  },
];

// Array of banner images (same image repeated 5 times)
const bannerImages = [
  require('../../../src/assests/Frame.png'),
  require('../../../src/assests/Frame.png'),
  require('../../../src/assests/Frame.png'),
  require('../../../src/assests/Frame.png'),
  require('../../../src/assests/Frame.png'),
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const [address, setAddress] = useState('Fetching location...');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  // Request Location Permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setAddress('Location permission denied');
      }
    } else {
      getCurrentLocation();
    }
  };

  // Fetch User's Location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        getAddressFromCoordinates(latitude, longitude);
      },
      error => {
        console.error(error);
        setAddress('Failed to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // Convert Coordinates to Address
  const getAddressFromCoordinates = (lat, lon) => {
    Geocoder.from(lat, lon)
      .then(json => {
        const formattedAddress =
          json.results[0]?.formatted_address || 'Unknown location';
        setAddress(formattedAddress);
      })
      .catch(error => {
        console.error(error);
        setAddress('Address not found');
      });
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => {
        const nextSlide = (prevSlide + 1) % bannerImages.length;

        // Scroll to the next slide
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (Dimensions.get('window').width - 32) * nextSlide,
            animated: true,
          });
        }

        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImagePress = images => {
    setSelectedImages(images);
    setModalVisible(true);
  };

  const handleModalImagePress = (screenName) => {
    setModalVisible(false);
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Address Section */}
        <TouchableOpacity
          style={styles.addressContent}
          onPress={getCurrentLocation}>
          <Image
            style={styles.addressImage}
            source={require('../../../src/assests/addressImage.png')}
          />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </TouchableOpacity>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search for services and packages"
          icon={() => (
            <Image
              source={require('../../../src/assests/search.png')}
              style={styles.searchIcon}
            />
          )}
          value={searchQuery}
          onChangeText={text => {
            console.log('Typed:', text); // Debugging log
            setSearchQuery(text);
          }}
          style={styles.searchBox}
          inputStyle={styles.searchInput}
        />
        <View style={styles.discountContainer}>
          <Image
            source={require('../../assests/Images/PersonalServiceImages/PlusImage.png')}
            style={styles.plusImage}
          />
          <Text style={styles.discountText}>Save 15% on every service</Text>
        </View>

        {/* Banner Image */}

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}>
          {bannerImages.map((image, index) => (
            <Image key={index} style={styles.bannerImage} source={image} />
          ))}
        </ScrollView>

        <View style={styles.card}>
          <Text style={styles.header}>Personal Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row', gap: -10}}
            style={styles.scrollView}>
            {services.map(service => (
              <TouchableOpacity
                key={service.id}
                onPress={() =>
                  handleImagePress([
                    service.image,
                    require('../../assests/Images/PersonalServiceImages/salonForWomen.png'),
                  ])
                }>
                <View style={styles.serviceContainer}>
                  <Image source={service.image} style={styles.image} />
                  <Text style={styles.label}>{service.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Home Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row', gap: -10}}
            style={styles.scrollView}>
            {services1.map(service => (
              <TouchableOpacity
                key={service.id}
                onPress={() =>
                  handleImagePress([
                    service.image,
                    require('../../assests/Images/HomeServicesImages/ElectricalPlumbing.png'),
                  ])
                }>
                <View style={styles.serviceContainer}>
                  <Image source={service.image} style={styles.image} />
                  <Text style={styles.label}>{service.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Trending Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row', gap: -10}}
            style={styles.scrollView}>
            {services2.map(service => (
              <TouchableOpacity
                key={service.id}
                onPress={() =>
                  handleImagePress([
                    service.image,
                    require('../../assests/Images/TrendingImages/BleachAndDaton.png'),
                  ])
                }>
                <View style={styles.serviceContainer}>
                  <Image source={service.image} style={styles.image} />
                  <Text style={styles.label}>{service.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>
              Explore All Trending Services
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Replace "___" line with a TouchableOpacity */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.modalLine} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalImageContainer}>
              <TouchableOpacity
                style={styles.modalImageWrapper}
                onPress={() => handleModalImagePress('SalonForWomenScreen')}>
                <Image
                  source={require('../../assests/Images/PersonalServiceImages/womenSalonImage.jpg')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalImageLabel}>Salon for Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalImageWrapper}
                onPress={() => handleModalImagePress('SpaForWomenScreen')}>
                <Image
                  source={require('../../assests/Images/PersonalServiceImages/spaForWomen.jpeg')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalImageLabel}>Spa for Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalImageWrapper}
                onPress={() =>
                  handleModalImagePress('HairStudioForWomenScreen')
                }>
                <Image
                  source={require('../../assests/Images/PersonalServiceImages/hairSaloonWomen.jpg')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalImageLabel}>
                  Hair Studio for Women
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalImageWrapper}
                onPress={() =>
                  handleModalImagePress('MakeUpStylingStudioScreen')
                }>
                <Image
                  source={require('../../assests/Images/PersonalServiceImages/MakeUpStudio.jpg')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalImageLabel}>
                  MakeUp & Styling Studio
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 16,
    width:'100%'
  },
  discountText: {
    fontSize: 15,
    color: '#000',
    flex:1,
    resizeMode:'contain',
    left:20,
    opacity:0.6
  },
  plusImage: {
    width: 90,
    height: 70,
    marginRight: 8,
    resizeMode: 'contain',
  },
  scrollView: {
    flexDirection: 'row',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    right: 90,
    opacity:0.6
  },
  serviceContainer: {
    alignItems: 'center',
    marginRight: 10, // Further reduced margin between icons
    width: 80, // Added width to ensure text is fully visible
  },
  image: {
    width: 30, // Set a consistent width for all icons
    height: 30, // Set a consistent height for all icons
    borderRadius: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    alignItems: 'center',
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBox: {
    marginTop: 15,
    height: 52,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 0.4,
  },
  searchInput: {
    fontSize: 15,
    opacity: 0.5,
  },
  scrollContainer: {
    marginTop: 10,
  },
  bannerImage: {
    width: Dimensions.get('window').width - 32,
    height: 150, // Adjusted height for the banner
    resizeMode: 'contain',
    marginBottom: 10, // Added margin to separate banner from services
  },
  serviceItem: {
    marginBottom: 10, // Reduced margin between service items
  },
  serviceImage: {
    width: '100%',
    height: 150, // Reduced height for service images
    resizeMode: 'stretch',
  },
  addressImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#888',
  },
  bannerContainer: {
    height: 150,
    marginBottom: 10,
  },
  addressTextContainer: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
  },
  label: {
    marginTop: 5,
    fontSize: 12, // Decreased font size for better fit
    color: '#555',
    textAlign: 'center',
    width: '100%', // Ensure the label has enough width to display the full text
  },
  addressText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  exploreContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10, // Adjusted margin to ensure visibility
    paddingBottom: 20, // Added padding to prevent overlap with icons
  },
  exploreText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 12, // Set font size to 12
    textAlign: 'right', // Align text to the right
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalLine: {
    width: 40, // Adjust the width of the line
    height: 4, // Adjust the height of the line
    backgroundColor: '#ccc', // Set the color of the line
    borderRadius: 2, // Make the edges rounded
  },
  modalImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalImageWrapper: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  modalImageLabel: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    width: '100%', // Ensure the label has enough width to display the full text
  },
});

export default HomePage;
