import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      textAlign: 'center',
      opacity: 0.4,
      fontSize: 12,
      marginBottom: 5,
    },
    phoneNumber: {
      textAlign: 'center',
      opacity: 0.4,
      fontSize: 14,
      marginBottom: 20,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    otpBox: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      fontSize: 20,
      marginHorizontal: 5,
      borderRadius: 5,
    },
    button: {
      backgroundColor: "#283891",
      width: "92%",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 50,
      top:80 // 👈 Increased marginTop to create vertical space
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  export default styles
  
  