import React, { createContext, useContext, useState } from 'react';

type UserDetails = {
  name: string;
  email: string;
  phoneNumber: string;
};

type UserContextType = {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  setPhoneNumber: (phoneNumber: string) => void;
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

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails: updateUserDetails,
        setPhoneNumber: updatePhoneNumber,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
