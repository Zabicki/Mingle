import { IUser } from 'app/shared/model/user.model';

export interface IReview {
  id?: string;
  score?: number;
  review?: string;
  reviews?: IUser;
  user?: IUser;
}

export const defaultValue: Readonly<IReview> = {};
