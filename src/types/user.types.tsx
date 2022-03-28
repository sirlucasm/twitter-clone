export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface IUserSignIn {
  identifier: string;
  password: string;
}
