import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import styles from './style';

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { user, profileImage } = route.params;

  const [updatedProfile, setUpdatedProfile] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: profileImage.uri || null,
  });

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Something went wrong: ' + response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setUpdatedProfile((prev) => ({ ...prev, profileImage: source }));
      }
    });
  };

  const handleSaveChanges = () => {
    navigation.navigate('Account', { updatedProfile });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../../assests/Images/PersonalServiceImages/back-button.png')}
              style={[styles.backButton, { tintColor: '#fff' }]} // Change to white color
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Edit Personal Details</Text>
        </View>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={
                updatedProfile.profileImage
                  ? { uri: updatedProfile.profileImage }
                  : require('../../../../../assests/Images/PersonalServiceImages/Profile.png')
              }
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Image
                source={require('../../../../../assests/Images/PersonalServiceImages/EditButton.png')}
                style={styles.editIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.name}
          onChangeText={(text) =>
            setUpdatedProfile((prev) => ({ ...prev, name: text }))
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.email}
          onChangeText={(text) =>
            setUpdatedProfile((prev) => ({ ...prev, email: text }))
          }
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.phoneNumber}
          onChangeText={(text) =>
            setUpdatedProfile((prev) => ({ ...prev, phoneNumber: text }))
          }
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default EditProfile;
