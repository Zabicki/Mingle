import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatRequest: ['chatId'],
  chatAllRequest: ['options'],
  chatUpdateRequest: ['chat'],
  chatDeleteRequest: ['chatId'],

  chatSuccess: ['chat'],
  chatAllSuccess: ['chats'],
  chatUpdateSuccess: ['chat'],
  chatDeleteSuccess: [],

  chatFailure: ['error'],
  chatAllFailure: ['error'],
  chatUpdateFailure: ['error'],
  chatDeleteFailure: ['error'],
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  chat: null,
  chats: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    chat: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    chats: [],
  })

// request to update from an api
export const updateRequest = state =>
  state.merge({
    updating: true,
  })
// request to delete from an api
export const deleteRequest = state =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { chat } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    chat,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { chats } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    chats,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { chat } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    chat,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    chat: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    chat: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    chats: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    chat: state.chat,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    chat: state.chat,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHAT_REQUEST]: request,
  [Types.CHAT_ALL_REQUEST]: allRequest,
  [Types.CHAT_UPDATE_REQUEST]: updateRequest,
  [Types.CHAT_DELETE_REQUEST]: deleteRequest,

  [Types.CHAT_SUCCESS]: success,
  [Types.CHAT_ALL_SUCCESS]: allSuccess,
  [Types.CHAT_UPDATE_SUCCESS]: updateSuccess,
  [Types.CHAT_DELETE_SUCCESS]: deleteSuccess,

  [Types.CHAT_FAILURE]: failure,
  [Types.CHAT_ALL_FAILURE]: allFailure,
  [Types.CHAT_UPDATE_FAILURE]: updateFailure,
  [Types.CHAT_DELETE_FAILURE]: deleteFailure,
})
