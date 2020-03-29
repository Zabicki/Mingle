import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IChat } from 'app/shared/model/chat.model';

export interface IMessage {
  id?: string;
  message?: string;
  date?: Moment;
  user?: IUser;
  messages?: IChat;
}

export const defaultValue: Readonly<IMessage> = {};
