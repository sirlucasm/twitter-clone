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
import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../settings';
import { IPost, IPostParams } from '../../@types/post.types';

class PostService {
  private path: string = 'users';
  private db: Firestore;
  private auth: Auth;
  private storage: FirebaseStorage;

  constructor() {
    this.db = db;
    this.auth = getAuth();
    this.storage = getStorage();
  }

  async create(params: IPostParams) {
    const newParams = Object.assign(params);
    if (params.image) {
      const image = await fetch(params.image);
      const imageBlob = await image.blob();
      const storageRef = ref(this.storage, `posts/${Date.now()}_${params.createdBy.username}`);
      const snapshot = await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      params.image = downloadURL;
    }
    const docRef = doc(collection(this.db, 'posts'));
    const userDocRef = doc(this.db, 'users', params.createdBy.uid);
    await updateDoc(userDocRef, { tweets: [ docRef.id ] });
    await setDoc(docRef, {
      id: docRef.id,
      likes: [],
      retweets: [],
      comments: [],
      createAt: new Date(),
      ...newParams
    });

    const postSnapshot = await getDoc(docRef);
    return postSnapshot.data();
  }

  async all() {
    const q = query(collection(this.db, 'posts'), orderBy('createAt', 'desc'));
    const postSnapshot = await getDocs(q);
    const posts: IPost[] = [];
    postSnapshot.forEach(res => posts.push(res.data() as IPost));
    return posts;
  }

  async likePost({ docId, userId }: { docId: string, userId: string }) {
    const docRef = doc(this.db, 'posts', docId);
    const post = await updateDoc(docRef, {
      likes: [ userId ]
    });
    return post;
  }

  async unlikePost({ docId, userId, likes }: { docId: string, userId: string, likes: string[] }) {
    const docRef = doc(this.db, 'posts', docId);
    const newLikesArr = [...likes];
    newLikesArr.splice(newLikesArr.indexOf(userId), 1);
    const post = await updateDoc(docRef, {
      likes: newLikesArr
    });
    return post;
  }

  async postsById(userId: string) {
    const q = query(collection(this.db, 'posts'), where('createdBy.uid', '==', userId), orderBy('createAt', 'desc'));
    const postSnapshot = await getDocs(q);
    const posts: IPost[] = [];
    postSnapshot.forEach(res => posts.push(res.data() as IPost));
    return posts;
  }
}

export default new PostService();
