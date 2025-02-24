"use client"

import File from '@/Utils/Files and Dependencies/File';
import React, { createContext, useContext, useState, ReactNode, JSX, useEffect } from 'react';

type UserType = {
  email: string;
  id: string;
  _id: string;
  image: string;
  name: string;
};

export type Chat = {
  role: string;
  message: string;
  _id: string;
}[]

export type fileType=typeof File.DEFAULT_FILE

interface ContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;

  chats: Chat | [];
  setChats: React.Dispatch<React.SetStateAction<Chat | []>>;

  homeprompt: string;
  setHomePrompt: React.Dispatch<React.SetStateAction<string>>;

  files: typeof File.DEFAULT_FILE;
  setFiles: React.Dispatch<React.SetStateAction<typeof File.DEFAULT_FILE>>;

  codeLoading: boolean;
  setCodeLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: ContextProps = {
  user: null,
  setUser: () => { },

  chats: [],
  setChats: () => { },

  homeprompt: '',
  setHomePrompt: () => { },

  files: File.DEFAULT_FILE,
  setFiles: () => { },

  codeLoading: false,
  setCodeLoading: () => { },
}

const MyContext = createContext<ContextProps>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState(defaultContext.user);
  const [chats, setChats] = useState(defaultContext.chats);
  const [homeprompt, setHomePrompt] = useState(defaultContext.homeprompt);
  const [files, setFiles] = React.useState(File.DEFAULT_FILE);
  const [codeLoading, setCodeLoading] = useState(false);



  const value = {
    user,
    setUser,
    chats,
    setChats,
    homeprompt,
    setHomePrompt,
    files,
    setFiles,
    codeLoading,
    setCodeLoading,
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