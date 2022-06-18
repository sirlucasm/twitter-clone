import { IUser } from "./user.types";

export interface IPost {
  id?: string;
  text?: string;
  image?: string;
  likes: [];
  retweets: [];
  comments: [];
  createdBy: IUser;
}

export interface IPostParams {
  text?: string;
  image?: string;
  createdBy: IUser;
}
