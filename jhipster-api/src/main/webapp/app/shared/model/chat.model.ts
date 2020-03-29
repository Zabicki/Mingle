import { IMessage } from 'app/shared/model/message.model';
import { IUser } from 'app/shared/model/user.model';

export interface IChat {
  id?: string;
  messages?: IMessage[];
  chats?: IUser[];
}

export const defaultValue: Readonly<IChat> = {};
