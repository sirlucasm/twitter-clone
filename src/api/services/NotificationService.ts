import {
  Firestore,
  getDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  where
} from 'firebase/firestore';

import {
  Auth,
  getAuth,
} from 'firebase/auth';
import { db } from '../settings';
import { INotification, INotificationParams } from '../../@types/notification.types';

class NotificationService {
  private path: string = 'users';
  private db: Firestore;
  private auth: Auth;

  constructor() {
    this.db = db;
    this.auth = getAuth();
  }

  async create(params: INotificationParams) {
    const newParams: any = {...params};
    const docRef = doc(collection(this.db, 'notifications'));
    newParams.createdAt = Date.now();
    await setDoc(docRef, {
      id: docRef.id,
      ...newParams
    });
    const notificationSnapshot = await getDoc(docRef);
    return notificationSnapshot.data();
  }

  async all() {
    const q = query(collection(this.db, 'notifications'), orderBy('createAt', 'desc'));
    const notificationSnapshot = await getDocs(q);
    const notifications: INotification[] = [];
    notificationSnapshot.forEach(res => notifications.push(res.data() as INotification));
    return notifications;
  }
}
