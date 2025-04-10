import React, { useState } from "react";
import styles from "./style";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet 
} from "react-native";
import firestore from "@react-native-firebase/firestore"; // Import Firestore
import { useNavigation } from "@react-navigation/native";

const NewRegistration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    if (!name || !email || phoneNumber.length !== 10) {
      Alert.alert("Error", "Please fill all the fields correctly.");
      return;
    }

    try {
      // Save user details to Firestore
      await firestore().collection("users").doc(phoneNumber).set({
        name,
        email,
        phoneNumber,
      });
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Login", { phoneNumber }); // Pass phone number to Login Screen
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred during registration.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};



export default NewRegistration;
