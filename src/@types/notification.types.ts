import { ICurrentUser, IUser } from "./user.types";

export interface INotification {
  id?: string;
  message: string;
  byUser: ICurrentUser | null;
  toUser: ICurrentUser | null;
  post?: string;
  notificationToken: string;
  createAt: Date;
}

export interface INotificationParams {
  message: string;
  byUser: ICurrentUser | null;
  toUser: ICurrentUser | null;
  post?: string;
  notificationToken: string;
}
