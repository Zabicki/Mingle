import { IUser } from 'app/shared/model/user.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IFavourites {
  id?: string;
  favourite?: Category;
  favourites?: IUser;
}

export const defaultValue: Readonly<IFavourites> = {};
