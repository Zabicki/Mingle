import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFavourites, defaultValue } from 'app/shared/model/favourites.model';

export const ACTION_TYPES = {
  FETCH_FAVOURITES_LIST: 'favourites/FETCH_FAVOURITES_LIST',
  FETCH_FAVOURITES: 'favourites/FETCH_FAVOURITES',
  CREATE_FAVOURITES: 'favourites/CREATE_FAVOURITES',
  UPDATE_FAVOURITES: 'favourites/UPDATE_FAVOURITES',
  DELETE_FAVOURITES: 'favourites/DELETE_FAVOURITES',
  RESET: 'favourites/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFavourites>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FavouritesState = Readonly<typeof initialState>;

// Reducer

export default (state: FavouritesState = initialState, action): FavouritesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FAVOURITES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FAVOURITES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FAVOURITES):
    case REQUEST(ACTION_TYPES.UPDATE_FAVOURITES):
    case REQUEST(ACTION_TYPES.DELETE_FAVOURITES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FAVOURITES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FAVOURITES):
    case FAILURE(ACTION_TYPES.CREATE_FAVOURITES):
    case FAILURE(ACTION_TYPES.UPDATE_FAVOURITES):
    case FAILURE(ACTION_TYPES.DELETE_FAVOURITES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FAVOURITES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FAVOURITES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FAVOURITES):
    case SUCCESS(ACTION_TYPES.UPDATE_FAVOURITES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FAVOURITES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/favourites';

// Actions

export const getEntities: ICrudGetAllAction<IFavourites> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FAVOURITES_LIST,
  payload: axios.get<IFavourites>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFavourites> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FAVOURITES,
    payload: axios.get<IFavourites>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFavourites> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FAVOURITES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFavourites> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FAVOURITES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFavourites> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FAVOURITES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
