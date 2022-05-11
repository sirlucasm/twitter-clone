import { Firestore, addDoc, collection, getDoc, FirestoreError } from 'firebase/firestore';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { db } from '../settings';
import { IUser, IUserSignIn } from '../../@types/user.types';
import { getTranslation } from '../../utils/FirebaseErrorTranslate';

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
    catch (err: any) {
      const error: FirestoreError = err;
      return Promise.reject(getTranslation(error.code));
    }
  }

  async login({ password, identifier }: IUserSignIn) {
    try {
      const userLogged = await signInWithEmailAndPassword(this.auth, identifier, password);
      return userLogged;
    }
    catch (err: any) {
      const error: FirestoreError = err;
      return Promise.reject(getTranslation(error.code));
    }
  }

  async logout() {
    try {
      return await this.auth.signOut();
    }
    catch (err: any) {
      const error: FirestoreError = err;
      return Promise.reject(getTranslation(error.code));
    }
  }

  async currentUser() {
    return this.auth.currentUser
  }

  async sendForgotPasswordEmail(email: string) {
    try {
      return await sendPasswordResetEmail(this.auth, email);
    }
    catch (err: any) {
      const error: FirestoreError = err;
      return Promise.reject(getTranslation(error.code));
    }
  }
}

export default new UserService();
