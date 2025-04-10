import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const BiometricsScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../assests/Images/PersonalServiceImages/back-button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Biometrics</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Biometrics</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#007BFF' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};



export default BiometricsScreen;
