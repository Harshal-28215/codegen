"use client"

import React, { createContext, useContext, useState, ReactNode, JSX } from 'react';

type UserType = {
  email: string;
  id: string;
  _id: string;
  image: string;
  name: string;
};

interface ContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const defaultContext: ContextProps = {
  user: null,
  setUser: () => { },
}

const MyContext = createContext<ContextProps>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState(defaultContext.user);


  const value = {
    user,
    setUser
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): ContextProps => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};