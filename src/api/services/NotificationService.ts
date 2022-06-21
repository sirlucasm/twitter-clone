import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
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
import { Platform } from 'react-native';

class NotificationService {
  private path: string = 'users';
  private db: Firestore;
  private auth: Auth;

  constructor() {
    this.db = db;
    this.auth = getAuth();
  }

  async create(params: INotificationParams) {
    const docRef = doc(collection(this.db, 'notifications'));
    await setDoc(docRef, {
      id: docRef.id,
      createAt: new Date(),
      ...params
    });
    const notificationSnapshot = await getDoc(docRef);
    return notificationSnapshot.data();
  }

  async all(userId: string) {
    const q = query(
      collection(this.db, 'notifications'),
      where('toUser.uid', '==', userId),
      where('byUser.uid', '!=', userId),
      orderBy('byUser.uid', 'asc'),
      orderBy('createAt', 'desc')
    );
    const notificationSnapshot = await getDocs(q);
    const notifications: INotification[] = [];
    notificationSnapshot.forEach(res => notifications.push(res.data() as INotification));
    return notifications;
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
}

export default new NotificationService();
