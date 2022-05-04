import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ICurrentUser, IUser, IUserSignIn } from "../@types/user.types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from "../api/services/UserService";
import Toast from 'react-native-toast-message';

type AuthContextProps = {
  signed: boolean;
  currentUser: ICurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser | null>>;
  signIn: ({ identifier, password }: IUserSignIn) => Promise<void>;
  signOut: () => void;
  signUp: (params: IUser) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = async ({ identifier, password }: IUserSignIn) => {
    setIsLoading(true);
    UserService.login({ identifier, password })
      .then(async (user: any) => {
        setCurrentUser(user);
        await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(user));
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      })
      .finally(() => setIsLoading(false));
  }

  const signOut = async () => {
    setIsLoading(true);
    UserService.logout()
      .then(async () => {
        setCurrentUser(null);
        await AsyncStorage.removeItem('twitter.currentUser');
      })
      .finally(() => setIsLoading(false));
  }

  const signUp = async (params: IUser) => {
    setIsLoading(true);
    UserService.create(params)
      .then(async (user: any) => {
        setCurrentUser(user)
        await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(user));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      const storedCurrentUser = await AsyncStorage.getItem('twitter.currentUser')
      if (storedCurrentUser) {
        const current = JSON.parse(storedCurrentUser);
        if (current) setCurrentUser(current);
      }
    }
    fetchCurrentUser().finally(() => setIsLoading(false));
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signed: !!currentUser,
        currentUser,
        setCurrentUser,
        signIn,
        signOut,
        signUp,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
