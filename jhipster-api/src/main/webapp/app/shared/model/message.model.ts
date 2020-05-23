import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IChat } from 'app/shared/model/chat.model';

export interface IMessage {
  id?: string;
  text?: string;
  date?: Moment;
  author?: IUser;
  chat?: IChat;
}

export const defaultValue: Readonly<IMessage> = {};
