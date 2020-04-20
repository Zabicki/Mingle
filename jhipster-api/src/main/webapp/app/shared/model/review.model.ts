import { IUser } from 'app/shared/model/user.model';

export interface IReview {
  id?: string;
  score?: number;
  text?: string;
  reviews?: IUser;
  user?: IUser;
}

export const defaultValue: Readonly<IReview> = {};
