import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IUser, IUserSignIn } from "../types/user.types";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  signed: boolean;
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  signIn: ({ identifier, password }: IUserSignIn) => Promise<void>;
  signOut: () => void;
  signUp: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const signIn = async ({ identifier, password }: IUserSignIn) => {
    if (
      identifier === '82999999999' ||
      identifier === 'teste@gmail.com' ||
      identifier === 'teste'
    ) {
      if (password === '123456') {
        const user: IUser = {
          name: 'Conta Teste',
          username: 'teste',
          email: 'teste@gmail.com',
          password: '123456',
          phone_number: '82999999999'
        };
        setCurrentUser(user);
        await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(user));
      }
    }
  }

  const signOut = async () => {
    setCurrentUser(null);
    await AsyncStorage.removeItem('twitter.currentUser');
  }

  const signUp = () => {

  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentUser(JSON.parse(await AsyncStorage.getItem('twitter.currentUser') || 'null') as IUser | null);
    }
    fetchCurrentUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signed: !!currentUser,
        currentUser,
        setCurrentUser,
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
