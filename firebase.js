import firebase from '@react-native-firebase/app';

// Check if Firebase is initialized (usually automatic with config files)
if (!firebase.apps.length) {
  firebase.initializeApp();
}

export default firebase;