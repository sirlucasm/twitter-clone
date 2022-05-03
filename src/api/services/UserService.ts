import { Firestore, addDoc, collection, getDoc } from 'firebase/firestore';
import { Auth, getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../settings';
import uuid from 'react-native-uuid';
import { IUser, IUserSignIn } from '../../@types/user.types';

class UserService {
  private path: string = 'users';
  private db: Firestore;
  private auth: Auth;

  constructor() {
    this.db = db;
    this.auth = getAuth();
  }

  async create({ email, password }: IUser) {
    try {
      const userCreated = await createUserWithEmailAndPassword(this.auth, email || '', password || '');
      await sendEmailVerification(userCreated.user);

      return userCreated;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async login({ password, identifier }: IUserSignIn) {
    try {
      const userLogged = await signInWithEmailAndPassword(this.auth, identifier, password);
      return userLogged;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async logout() {
    try {
      return await this.auth.signOut();
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async currentUser() {
    return this.auth.currentUser
  }
}

export default new UserService();
