import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  username: string;
  email: string;
}

interface UserContextType {
  userData: UserData;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
  });

  const setUsername = (username: string) => {
    setUserData(prev => ({ ...prev, username }));
  };

  const setEmail = (email: string) => {
    setUserData(prev => ({ ...prev, email }));
  };

  return (
    <UserContext.Provider value={{ userData, setUsername, setEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
