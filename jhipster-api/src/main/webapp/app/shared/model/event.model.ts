import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Privacy } from 'app/shared/model/enumerations/privacy.model';

export interface IEvent {
  id?: string;
  name?: string;
  description?: string;
  pictureContentType?: string;
  picture?: any;
  city?: string;
  address?: string;
  location?: number[];
  maxParticipants?: number;
  date?: Moment;
  recurrent?: boolean;
  interval?: number;
  category?: Category;
  privacy?: Privacy;
  host?: IUser;
  participants?: IUser[];
}

export const defaultValue: Readonly<IEvent> = {
  recurrent: false
};
