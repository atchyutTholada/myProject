import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', // Light grey background for better contrast
  },
  ratingText: {
    fontSize: 14,
    color: '#000', // Black color for the rating text
    fontFamily: 'Roboto-Regular', // Changed font-family
  },
  heading: {
    fontSize: 26, // Slightly larger font size
    fontWeight: 'bold',
    color: '#333', // Darker color for better readability
    marginBottom: 20,
    textAlign: 'center', // Center align the heading
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15, // Increased border radius for a softer look
    padding: 20, // Increased padding for more space
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1, // Reduced shadow opacity for a subtle effect
    shadowRadius: 10, // Increased shadow radius for a softer shadow
    shadowOffset: { width: 0, height: 5 }, // Increased shadow offset for a more pronounced shadow
    elevation: 5,
  },
  ratingStar: {
    top: 12, // Moved the "*" icon a little bit down
    fontSize: 19, // Slightly larger font size for the "*" icon
    color: '#FFD700', // Darker gold color
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16, // Slightly larger font size
    fontWeight: 'bold',
    color: '#000', // Dark black color
    marginBottom: 5,
    fontFamily: 'Roboto-Bold', // Changed font-family
  },
  rating: {
    fontSize: 16, // Slightly larger font size for the "*" icon
    color: 'gold', // Golden color for the "*" icon
    marginBottom: 5,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000', // Dark black color
    marginBottom: 5,
    borderBottomWidth: 2, // Increased border width for bigger dots
    borderStyle: 'dotted',
    borderColor: '#555', // Dark grey color for the dotted line
    fontFamily: 'Roboto-Bold', // Changed font-family
  },
  description: {
    fontSize: 14,
    color: '#000', // Black color
    marginBottom: 10,
    fontFamily: 'Roboto-Regular', // Changed font-family
  },
  viewDetails: {
    fontSize: 12,
    color: '#3064b8',
    fontFamily: 'Roboto-Regular', // Changed font-family
  },
  cardRight: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1, // Added border to the image
    borderColor: '#ddd', // Light grey border color
  },
  addButton: {
    backgroundColor: 'white',
    paddingVertical: 8, // Increased padding for a larger button
    paddingHorizontal: 25, // Increased padding for a larger button
    borderRadius: 5,
    borderColor: '#3064b8', // Blue border color
    borderWidth: 0.7, // Border width
  },
  addButtonText: {
    color: '#3064b8',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold', // Changed font-family
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', // Grey color
    marginVertical: 20, // Increased margin for better visibility
  },
});

export default styles;