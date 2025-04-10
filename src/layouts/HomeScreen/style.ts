import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', // Light background color for better contrast
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    flexDirection: 'row',
  },
  header: {
    fontSize: 16, // Slightly larger font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start', // Align header to the start
  },
  serviceContainer: {
    alignItems: 'center',
    marginRight: 10, // Adjusted margin for better spacing
    width: 80,
  },
  image: {
    width: 40, // Reduced size for better spacing
    height: 40,
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15, // Increased margin for better spacing
    shadowColor: '#000',
    shadowOpacity: 0.1, // Reduced shadow opacity for a softer look
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
    width: '100%', // Ensure card takes full width
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 16, // Slightly larger font size
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
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 10,
  },
  serviceImage: {
    width: '100%',
    height: 150,
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
    backgroundColor: '#fff', // White background for address bar
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    fontSize: 12, // Adjusted font size for better fit
    color: '#555',
    textAlign: 'center',
    width: 80,
  },
  addressText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  exploreContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    paddingBottom: 20,
  },
  exploreText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 12,
    textAlign: 'right',
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
  closeButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: 70,
  },
  modalImageLabel: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
});

export default styles;


