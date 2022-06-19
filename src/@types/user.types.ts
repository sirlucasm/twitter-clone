import { User } from "firebase/auth";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  profilePicture: string;
  backgroundPicture: string;
  followers: [];
  following: []
  tweets: []
  uid: string;
  biography?: string;
}

export type ICurrentUser = User & IUser;

export interface IUserSignIn {
  identifier: string;
  password: string;
}
