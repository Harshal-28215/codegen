"use client"

import React, { createContext, useContext, useState, ReactNode, JSX } from 'react';

type UserType = {
  email: string;
  id: string;
  _id: string;
  image: string;
  name: string;
};

type Chat = {
  role: string;
  message: string;
  _id: string;
}[]

interface ContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;

  chats: Chat | [];
  setChats: React.Dispatch<React.SetStateAction<Chat | []>>;

  homeprompt: string;
  setHomePrompt: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContext: ContextProps = {
  user: null,
  setUser: () => { },

  chats: [],
  setChats: () => { },

  homeprompt: '',
  setHomePrompt: () => { },
}

const MyContext = createContext<ContextProps>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState(defaultContext.user);
  const [chats, setChats] = useState(defaultContext.chats);
  const [homeprompt, setHomePrompt] = useState(defaultContext.homeprompt);


  const value = {
    user,
    setUser,
    chats,
    setChats,
    homeprompt,
    setHomePrompt,
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