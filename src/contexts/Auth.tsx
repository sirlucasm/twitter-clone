import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ICurrentUser, IUser, IUserSignIn } from "../@types/user.types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from "../api/services/UserService";

type AuthContextProps = {
  signed: boolean;
  currentUser: ICurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser | null>>;
  signIn: ({ identifier, password }: IUserSignIn) => Promise<void>;
  signOut: () => void;
  signUp: (params: IUser) => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  const signIn = async ({ identifier, password }: IUserSignIn) => {
    UserService.login({ identifier, password })
      .then(async (user: any) => {
        setCurrentUser(user);
        await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(user));
      })
  }

  const signOut = async () => {
    UserService.logout()
      .then(async () => {
        setCurrentUser(null);
        await AsyncStorage.removeItem('twitter.currentUser');
      });
  }

  const signUp = async (params: IUser) => {
    UserService.create(params)
      .then(async (user: any) => {
        console.log(user)
        setCurrentUser(user)
        await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(user));
      })
      .catch(console.error);
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const current = await UserService.currentUser();
      setCurrentUser(current);
    }
    fetchCurrentUser();
  }, [currentUser]);
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
