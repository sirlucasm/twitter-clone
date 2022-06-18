import { ICurrentUser } from "./user.types";

export interface IPost {
  id?: string;
  text?: string;
  image?: string;
  likes: [];
  retweets: [];
  comments: [];
  createdBy: ICurrentUser;
}

export interface IPostParams {
  text?: string;
  image?: string;
  createdBy: ICurrentUser;
}
