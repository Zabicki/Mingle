import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChat, defaultValue } from 'app/shared/model/chat.model';

import { IMessage } from 'app/shared/model/message.model';

export const ACTION_TYPES = {
  FETCH_CHAT_LIST: 'chat/FETCH_CHAT_LIST',
  FETCH_MESSAGE: 'chat/FETCH_MESSAGE',
  FETCH_CHAT: 'chat/FETCH_CHAT',
  CREATE_CHAT: 'chat/CREATE_CHAT',
  UPDATE_CHAT: 'chat/UPDATE_CHAT',
  DELETE_CHAT: 'chat/DELETE_CHAT',
  RESET: 'chat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChat>,
  messages: [] as ReadonlyArray<IMessage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChatState = Readonly<typeof initialState>;

// Reducer

export default (state: ChatState = initialState, action): ChatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAT):
    case REQUEST(ACTION_TYPES.FETCH_MESSAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAT):
    case REQUEST(ACTION_TYPES.UPDATE_CHAT):
    case REQUEST(ACTION_TYPES.DELETE_CHAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAT):
    case FAILURE(ACTION_TYPES.CREATE_CHAT):
    case FAILURE(ACTION_TYPES.UPDATE_CHAT):
    case FAILURE(ACTION_TYPES.DELETE_CHAT):
    case FAILURE(ACTION_TYPES.FETCH_MESSAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MESSAGE):
      return{
        ...state,
        loading: false,
        messages: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAT):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAT):
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

const apiUrl = 'api/chat';

// Actions

export const getEntities: ICrudGetAllAction<IChat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAT_LIST,
  payload: axios.get<IChat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getMessages: ICrudGetAllAction<IMessage> = (channelId, page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MESSAGE,
  payload: axios.get<IChat>(`${apiUrl}/${channelId}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAT,
    payload: axios.get<IChat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
