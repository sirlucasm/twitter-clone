import { Firestore, getDoc, FirestoreError, collection, doc, setDoc, updateDoc, query, orderBy, startAt, endAt, getDocs, } from 'firebase/firestore';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { db } from '../settings';
import { ICurrentUser, IUser, IUserSignIn } from '../../@types/user.types';
import { getTranslation } from '../../utils/FirebaseErrorTranslate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

class UserService {
  private path: string = 'users';
  private db: Firestore;
  private auth: Auth;
  private storage: FirebaseStorage;

  constructor() {
    this.db = db;
    this.auth = getAuth();
    this.storage = getStorage();
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
      const docRef = doc(this.db, 'users', userLogged.user.uid);
      const userSnapshot = await getDoc(docRef);
      return { ...userLogged, ...userSnapshot.data() };
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
    const authUser: any = this.auth.currentUser;
    if (authUser) {
      const docRef = doc(this.db, 'users', authUser.uid);
      const userSnapshot = await getDoc(docRef);
      return { ...authUser, ...userSnapshot.data() };
    } return undefined;
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

  async update(
    userId: string,
    params: {
      name?: string, username?: string, profilePicture?: string
    }
  ) {
    const userPfpcUrl = await this.uploadImage(params.profilePicture || '', userId);
    params.profilePicture = userPfpcUrl;
    const docRef = doc(this.db, 'users', userId);
    const user = await updateDoc(docRef, params);

    await AsyncStorage.setItem('twitter.currentUser', JSON.stringify(await this.currentUser()));
    return user;
  }

  async uploadImage(imageUri: string, userId: string) {
    if (!imageUri) return ''
    const image = await fetch(imageUri);
    const imageBlob = await image.blob();
    const storageRef = ref(this.storage, `users/${userId}`);
    const snapshot = await uploadBytes(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  async searchUsers(searchQuery: string) {
    const colRef = collection(this.db, 'users');
    const q = query(colRef, orderBy('name'));

    const userSnapshot = await getDocs(q);
    const users: ICurrentUser[] = [];
    userSnapshot.forEach(res => users.push(res.data() as ICurrentUser));

    return users.filter((data) => data.name.toLowerCase().includes(searchQuery));
  }
}

export default new UserService();
