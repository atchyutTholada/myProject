import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database'; // Import Firebase Realtime Database
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {useUser} from '../../../../context/UserContext';
import { useAuth } from '../../../../context/AuthContext';

const AccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name, email, phoneNumber} = route.params || {};
  // const {phoneNumber} = useUser(); // Access phoneNumber from context

  const {logout} = useAuth();

  const [profileImage, setProfileImage] = useState(
    require('../../../../assests/Images/PersonalServiceImages/Profile.png'),
  );

  const userDetails = useUser(); // Access user details from context
  const [user, setUser] = useState({
    name: name,
    email: email,
    phoneNumber:phoneNumber,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (phoneNumber) {
        const snapshot = await database()
          .ref(`/users/${phoneNumber}`)
          .once('value');
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
          if (userData.profileImage) {
            setProfileImage({uri: userData.profileImage});
          }
        } else {
          Alert.alert('Error', 'User details not found.');
        }
      }
    };

    fetchUserDetails();
  }, [phoneNumber]);

  // Update profile data if changes are passed from EditProfile
  React.useEffect(() => {
    if (route.params?.updatedProfile) {
      const {updatedProfile} = route.params;
      setUser(prevUser => ({
        ...prevUser,
        ...updatedProfile,
      }));
      if (updatedProfile.profileImage) {
        setProfileImage({uri: updatedProfile.profileImage});
      }
    }
  }, [route.params?.updatedProfile]);

  const handleLogout = async () => {
    await logout(); // Clear authentication state
    Alert.alert('Logged Out', 'You have been logged out.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Something went wrong: ' + response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source); // Update the profile image locally

        // Save the profile image to Firebase Realtime Database
        try {
          if (phoneNumber) {
            await database().ref(`/users/${phoneNumber}`).update({
              profileImage: source.uri,
            });
            Alert.alert('Success', 'Profile image updated successfully!');
          }
        } catch (error) {
          Alert.alert(
            'Error',
            'Failed to update profile image in the database.',
          );
        }
      }
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {user, profileImage});
  };

  const handlePassword = () => {
    navigation.navigate('PasswordScreen');
  };

  const handleMyCards = () => {
    navigation.navigate('MyCards');
  };

  const handleAccountLimits = () => {
    navigation.navigate('AccountsScreenLimits')
  };

  const handleBiometrics = () => {
    navigation.navigate('Biometric');
  };

  const handleFAQSupport = () => {
    navigation.navigate('FAQScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../assests/Images/PersonalServiceImages/back-button.png')}
              style={[styles.backButton, {tintColor: '#fff'}]} // Change to white color
            />
          </TouchableOpacity>
          <Text style={styles.heading}>My Profile</Text>
        </View>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}>
            <Image
              source={require('../../../../assests/Images/PersonalServiceImages/EditButton.png')}
              style={styles.editButtonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profilePhone}>{user.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeading}>Other settings</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handlePassword}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/password-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.settingsButtonText}>Password settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={handleMyCards}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/cards-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.settingsButtonText} numberOfLines={1}>
            My cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleAccountLimits}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/limits-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.settingsButtonText}>Account limits</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleBiometrics}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/biometrics-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.settingsButtonText}>Biometrics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleFAQSupport}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/faq-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.settingsButtonText}>FAQ/Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image
            source={require('../../../../assests/Images/PersonalServiceImages/logout-icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.logoutButtonText} numberOfLines={1}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  profileHeader: {
    backgroundColor: '#3064b8', // Background color for the profile section
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    top: 10,
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    right: 30,
    top: 10,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff', // White border for contrast
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    top: 20,
  },
  editButtonImage: {
    width: 20,
    height: 20,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  profilePhone: {
    fontSize: 14,
    color: '#fff',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  settingsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingsIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#e94e77',
    marginLeft: 3,
    width: '100%',
  },
});

export default AccountScreen;
