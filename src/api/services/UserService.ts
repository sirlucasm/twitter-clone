import { Firestore, getDoc, FirestoreError, collection, doc, setDoc, } from 'firebase/firestore';
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

  async create({ email, password, name, username }: IUser) {
    try {
      const userCreated = await createUserWithEmailAndPassword(this.auth, email || '', password || '');
      const uid = userCreated.user.uid;
      const docRef = doc(this.db, 'users', uid);
      await setDoc(docRef, {
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        backgroundPicture: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        followers: [],
        following: [],
        uid,
        name,
        email,
        username
      });

      const userSnapshot = await getDoc(docRef);

      await sendEmailVerification(userCreated.user);
      return { ...userCreated, ...userSnapshot.data() };
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
