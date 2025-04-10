import React, { createContext, useContext, useState } from 'react';
import database from '@react-native-firebase/database';

type UserDetails = {
  name: string;
  email: string;
  phoneNumber: string;
};

type UserContextType = {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  fetchUserDetails: (phoneNumber: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const updateUserDetails = (details: UserDetails) => {
    setUserDetails(details);
  };

  const updatePhoneNumber = (phoneNumber: string) => {
    setUserDetails((prev) => (prev ? { ...prev, phoneNumber } : null));
  };

  const fetchUserDetails = async (phoneNumber: string) => {
    try {
      console.log('Fetching user details for phoneNumber:', phoneNumber); // Debug log
      const snapshot = await database().ref(`/users/${phoneNumber}`).once('value');
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log('Fetched user data:', userData); // Debug log
        setUserDetails(userData);
      } else {
        console.warn('User details not found in the database.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails: updateUserDetails,
        setPhoneNumber: updatePhoneNumber,
        fetchUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
