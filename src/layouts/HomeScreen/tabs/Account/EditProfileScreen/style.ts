import { StyleSheet } from "react-native";

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
      paddingVertical: 36,
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
    },
    heading: {
      flex: 1,
      top:-2,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff', // White text for contrast
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#fff', // White border for contrast
    },
    editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 8, // Increased padding for a larger icon
    },
    editIcon: {
      width: 30, // Increased width
      height: 30, // Increased height
    },
    inputContainer: {
      marginBottom: 20,
      paddingHorizontal: 16,
    },
    label: {
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    saveButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 16,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  export default styles;