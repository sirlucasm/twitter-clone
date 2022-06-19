import { ICurrentUser } from "./user.types";

export interface INotification {
  id?: string;
  message: string;
  byUser: ICurrentUser;
  toUser: ICurrentUser;
  createdAt: number;
}

export interface INotificationParams {
  message: string;
  byUser: ICurrentUser;
  toUser: ICurrentUser;
}
