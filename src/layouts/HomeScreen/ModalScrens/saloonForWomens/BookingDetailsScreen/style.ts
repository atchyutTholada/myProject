import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
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
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    card: {
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
    image: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: 20,
    },
    detailContainer: {
      marginBottom: 10,
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
    summaryContainer: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    summaryText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    summaryLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#555',
    },
    summaryValue: {
      fontSize: 16,
      color: '#333',
    },
    confirmButton: {
      backgroundColor: '#ff7f50',
      paddingVertical: 10,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default styles;