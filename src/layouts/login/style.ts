import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  newRegistrationText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center", // Center the text
  },
  HomeServices: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "92%",
    alignSelf: "center",
    marginTop: 20,
  },
  prefix: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "#333",
  },
  separator: {
    fontSize: 18,
    color: "#999",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  infoText: {
    opacity: 0.4,
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
  },
  infoText1:{
    opacity: 0.4,
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
    right:65,
    bottom:10
  },
  button: {
    backgroundColor: "#283891",
    width: "92%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default styles;