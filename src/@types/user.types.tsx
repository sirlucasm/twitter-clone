import { User } from "firebase/auth";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
}

export interface ICurrentUser extends User {}

export interface IUserSignIn {
  identifier: string;
  password: string;
}
